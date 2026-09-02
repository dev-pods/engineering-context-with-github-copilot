import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TagAutocomplete } from "@/components/upload/TagAutocomplete";
import { AVAILABLE_TAGS } from "@/lib/mock-tag-data";

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
});
