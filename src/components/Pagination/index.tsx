import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export default function Pagination({
  totalCountRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountRegisters / registersPerPage);
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      alignItems="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem
              number={1}
              onPageChange={onPageChange}
            ></PaginationItem>
            {currentPage > 2 + siblingsCount && <Text>...</Text>}
          </>
        )}
        {previousPages.length > 0
          ? previousPages.map((page) => {
              return (
                <PaginationItem
                  number={page}
                  key={page}
                  onPageChange={onPageChange}
                ></PaginationItem>
              );
            })
          : null}
        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        ></PaginationItem>
        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                number={page}
                key={page}
                onPageChange={onPageChange}
              ></PaginationItem>
            );
          })}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem
              number={lastPage}
              onPageChange={onPageChange}
            ></PaginationItem>
          </>
        )}
      </Stack>
    </Stack>
  );
}
