import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TagAutocomplete } from "@/components/upload/TagAutocomplete";
import { AVAILABLE_TAGS } from "@/lib/mock-tag-data";
import UploadPage from "@/app/upload/page";

function ControlledAutocomplete() {
  const [value, setValue] = useState("");

  return (
    <TagAutocomplete
      availableTags={AVAILABLE_TAGS}
      label="Tags separadas por vírgula"
      onChange={setValue}
      value={value}
    />
  );
}

describe("TagAutocomplete solution contract", () => {
  it("integrates suggestions into the Upload page", async () => {
    const user = userEvent.setup();
    render(<UploadPage />);
    const input = screen.getByRole("combobox", { name: /Tags separadas por v[ií]rgula/i });
    expect(input).toHaveAttribute("name", "tags");
    await user.type(input, "wi");
    expect(screen.getByRole("option", { name: "wildlife" })).toBeVisible();
  });

  it("selects a suggestion by click and preserves previous tags", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);
    const input = screen.getByRole("combobox");
    await user.type(input, "portrait, wi");
    await user.click(screen.getByRole("option", { name: "wildlife" }));
    expect(input).toHaveValue("portrait, wildlife");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("filters suggestions from the current token", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);

    await user.type(screen.getByRole("combobox"), "w");

    expect(screen.getByRole("option", { name: "wedding" })).toBeVisible();
    expect(screen.getByRole("option", { name: "wildlife" })).toBeVisible();
    expect(screen.queryByRole("option", { name: "portrait" })).not.toBeInTheDocument();
  });

  it("selects with the keyboard and preserves comma-separated tags", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);
    const input = screen.getByRole("combobox");

    await user.type(input, "portrait, wi");
    await user.keyboard("{ArrowDown}{Enter}");

    expect(input).toHaveValue("portrait, wildlife");
  });

  it("does not suggest a tag that is already selected", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);
    const input = screen.getByRole("combobox");

    await user.type(input, "wedding, wed");

    expect(screen.queryByRole("option", { name: "wedding" })).not.toBeInTheDocument();
  });

  it("exposes the listbox state and closes suggestions with Escape", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);
    const input = screen.getByRole("combobox");

    expect(input).toHaveAttribute("aria-expanded", "false");

    await user.type(input, "w");

    const listbox = screen.getByRole("listbox");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-controls", listbox.id);

    await user.keyboard("{Escape}");

    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveValue("w");
  });

  it("keeps focus and announces the active option when navigating in both directions", async () => {
    const user = userEvent.setup();
    render(<ControlledAutocomplete />);
    const input = screen.getByRole("combobox");
    await user.type(input, "w");
    await user.keyboard("{ArrowDown}{ArrowDown}");
    const second = screen.getByRole("option", { name: "wildlife" });
    expect(second.id).not.toBe("");
    expect(input).toHaveAttribute("aria-activedescendant", second.id);
    expect(second).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    const first = screen.getByRole("option", { name: "wedding" });
    expect(first.id).not.toBe("");
    expect(input).toHaveAttribute("aria-activedescendant", first.id);
    expect(first).toHaveAttribute("aria-selected", "true");
    expect(second).toHaveAttribute("aria-selected", "false");
  });

  it("closes on Tab and does not submit the form when selecting with Enter", async () => {
    const user = userEvent.setup();
    let submissions = 0;
    render(<form onSubmit={(event) => { event.preventDefault(); submissions += 1; }}>
      <ControlledAutocomplete />
      <button type="submit">Continuar</button>
    </form>);
    const input = screen.getByRole("combobox");
    await user.type(input, "wi");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(submissions).toBe(0);
    await user.clear(input);
    await user.type(input, "w");
    await user.tab();
    expect(screen.getByRole("button", { name: "Continuar" })).toHaveFocus();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
