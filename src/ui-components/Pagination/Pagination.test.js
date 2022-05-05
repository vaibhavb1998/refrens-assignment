import { render, screen } from "@testing-library/react";
import Pagination from ".";

test("render pagination component", () => {
  render(
    <Pagination
      handlePrev={() => {}}
      prevDisabled={false}
      handleNext={() => {}}
      nextDisabled={false}
      loading={false}
    />,
  );

  const prevButton = screen.getByText(/prev/i);
  expect(prevButton).toBeInTheDocument();

  const nextButton = screen.getByText(/next/i);
  expect(nextButton).toBeInTheDocument();
});

test("prev and next button to be disabled when api loading", () => {
  render(
    <Pagination
      handlePrev={() => {}}
      prevDisabled
      handleNext={() => {}}
      nextDisabled={false}
      loading
    />,
  );

  expect(screen.getByText(/prev/i).closest("button")).toBeDisabled();
  expect(screen.getByText(/next/i).closest("button")).toBeDisabled();
});

test("prev button to be disabled it's the first page", () => {
  render(
    <Pagination
      handlePrev={() => {}}
      prevDisabled
      handleNext={() => {}}
      nextDisabled={false}
      loading={false}
    />,
  );

  expect(screen.getByText(/prev/i).closest("button")).toBeDisabled();
  expect(screen.getByText(/next/i).closest("button")).not.toBeDisabled();
});

test("prev button to be disabled it's the last page", () => {
  render(
    <Pagination
      handlePrev={() => {}}
      prevDisabled={false}
      handleNext={() => {}}
      nextDisabled
      loading={false}
    />,
  );

  expect(screen.getByText(/prev/i).closest("button")).not.toBeDisabled();
  expect(screen.getByText(/next/i).closest("button")).toBeDisabled();
});
