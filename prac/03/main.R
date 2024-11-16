# Used libraries
library(readr)

for (run_example in c(TRUE, FALSE)) {

  # Input to run
  folder <- "prac/03/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Process input to list of lists
  grid <- lapply(strsplit(input, ' '), as.numeric)
  asteroids <- list()
  dims <- c(length(grid), length(grid[[1]]))

  # Function to find all linked elements in grid based on some input location. Visited points are reset to 0.
  run_dfs <- function(loc, grid) {
    if (any(loc<=0)) {
      return (list(0, grid))
    } else if (any(loc>dims)) {
      return (list(0, grid))
    } else {
      this_val <- grid[[loc[1]]][loc[2]]
      if (this_val == 0) {
        return (list(0, grid))
      }
      grid[[loc[1]]][loc[2]] <- 0
      add_iter <- c(list(c(0, 1)), list(c(0, -1)), list(c(1, 0)), list(c(-1, 0)))
      for (add in add_iter) {
        add_res <- run_dfs(loc + add, grid)
        grid <- add_res[2][[1]]
        this_val <- this_val + add_res[1][[1]]
      }
      return (list(this_val, grid))
    }
  }

  # Loop over all elements as possible start point of DFS algorithm
  for (i in 1:dims[1]) {
    for (j in 1:dims[2]) {
      if (grid[[i]][j] > 0) {
        this_asteroid <- run_dfs(c(i, j), grid)
        grid <- this_asteroid[[2]]
        asteroids <- c(asteroids, this_asteroid[[1]])
      }
    }
  }
  # Output floor of average
  print(paste0("Solution for ", filename, ": ", floor(mean(mapply(sum, asteroids)))))
}