# Used libraries
library(readr)

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/xx/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Write solution here
  # ..

  # Output number depending on who wins
  print(paste0("Solution for ", filename, ": ", ifelse(locs[1] >= dim * dim, i_move, 2 * i_move)))
}