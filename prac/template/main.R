# Used libraries
library(readr)

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/xx/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Write solution here

  # Output of solution
  print(paste0("Solution for ", filename, ": ", "TODO"))
}