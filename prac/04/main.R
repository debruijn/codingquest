# Used libraries
library(readr)

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/04/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Write solution here

  # Process input further and get dimensions of problem
  input <- strsplit(input, " ")
  dims <- c(length(input) - 1, length(input[[1]]) - 1)

  ## Calculate for each row the checksum until one fails, write down index and diff
  for (i in 1:dims[1]) {
    this_row <- input[[i]]
    this_check <- sum(sapply(this_row[1:dims[2]], strtoi, 16)) %% 256
    checksum <- strtoi(this_row[dims[2]+1], 16)
    if (this_check != checksum) {
      row_res <- c(i, this_check - checksum)
      break
    }
  }

  ## Calculate for each col the checksum until one fails, write down index and diff
  for (j in 1:dims[2]) {
    this_col <- sapply(input, function(x) x[j])
    this_check <- sum(sapply(this_col[1:dims[1]], strtoi, 16)) %% 256
    checksum <- strtoi(this_col[dims[1]+1], 16)
    if (this_check != checksum) {
      col_res <- c(j, this_check - checksum)
      break
    }
  }

  ## Get wrong val and correct val
  wrong_val <- strtoi(input[[row_res[1]]][col_res[1]], 16)
  diff <- (row_res[2] + 256) %% 256
  corr_val <- wrong_val - diff

  # Output of solution
  print(paste0("Solution for ", filename, ": ", corr_val * wrong_val))
}