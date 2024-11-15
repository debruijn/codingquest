# Used libraries
library(readr)

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/01/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Split input into game grid and player moves
  dim <- length(strsplit(input[1], " ")[[1]])
  grid <- input[1:dim]
  moves <- input[(dim+1) : length(input)]

  # Process grid further into a single list to traverse
  straight <- lapply(strsplit(grid[dim], " "), FUN=strtoi)[[1]]
  reverse <- TRUE
  for (i in seq(dim-1, 1)) {
    if (reverse) {
        straight <- c(straight, rev(lapply(strsplit(grid[i], " "), FUN=strtoi)[[1]]))
    } else {
        straight <- c(straight, lapply(strsplit(grid[i], " "), FUN=strtoi)[[1]])
    }
    reverse <- !reverse
  }
  straight <- c(straight, rep(0, max(straight)))  # Add padding equal to max number to not crash when last step goes over

  # Initialize variables
  locs <- c(1, 1)
  i_move <- 1
  stop <- FALSE

  # Play until reaches end
  while (!stop) {
    this_moves <- lapply(strsplit(moves[i_move], " "), FUN=strtoi)[[1]]
    locs <- locs + this_moves
    while (straight[locs[1]] != 0) {
      locs[1] <- locs[1] + straight[locs[1]]
    }
    while (straight[locs[2]] != 0) {
      locs[2] <- locs[2] + straight[locs[2]]
    }
    if ((locs[1] >= dim * dim) || (locs[2] >= dim * dim)) {
      stop <- TRUE
    } else {
      i_move <- i_move + 1
    }
  }

  # Output number depending on who wins
  print(paste0("Solution for ", filename, ": ", ifelse(locs[1] >= dim * dim, i_move, 2 * i_move)))
}