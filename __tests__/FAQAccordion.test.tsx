import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FAQAccordion from "@/components/shared/FAQAccordion";

const mockItems = [
  { question: "What is the minimum deposit?", answer: "The minimum deposit is $100." },
  { question: "Do you offer a demo account?", answer: "Yes, demo accounts are available." },
];

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("FAQAccordion", () => {
  it("renders all FAQ questions", () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText("What is the minimum deposit?")).toBeInTheDocument();
    expect(screen.getByText("Do you offer a demo account?")).toBeInTheDocument();
  });

  it("first item is open by default", () => {
    render(<FAQAccordion items={mockItems} />);
    expect(screen.getByText("The minimum deposit is $100.")).toBeInTheDocument();
  });

  it("toggles open/close on button click", async () => {
    render(<FAQAccordion items={mockItems} />);
    const secondBtn = screen.getByText("Do you offer a demo account?");
    fireEvent.click(secondBtn);
    await waitFor(() => {
      expect(screen.getByText("Yes, demo accounts are available.")).toBeInTheDocument();
    });
  });

  it("has correct ARIA attributes on buttons", () => {
    render(<FAQAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });
});
