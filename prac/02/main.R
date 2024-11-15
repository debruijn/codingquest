# Used libraries
library(readr)

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/02/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Also include fixed input: guesses
  if (run_example) {
    guesses <- c("hapless GBYYYBB", "jackpot BBBBYBB", "fullest YYGYYBB")
  } else {
    guesses <- c("keyless YYBBYYG", "society YGYYYBB", "phobias BBGBGBG")
  }

  # First, process what we know for sure: G elements
  len_w <- 7
  known <- "......."
  for (guess in guesses) {
    word <- strsplit(guess, " ")[[1]][1]
    corr <- strsplit(guess, " ")[[1]][2]
    for (i in 1:len_w) {
      if (substr(corr, i, i) == "G") {
        known <- paste0(substr(known, 1, i-1), substr(word, i, i), substr(known, i+1, len_w))
      }
    }
  }
  input <- input[grep(known, input)]  # Filter out using grep

  # Then, go over all remaining inputs and find one that matches the B and Y requirements as well
  # ("break" each time there is a violation)
  solution <- "to_find"

  for (try_word in input) {
    for (guess in guesses) {
      word <- strsplit(guess, " ")[[1]][1]
      corr <- strsplit(guess, " ")[[1]][2]
      is_OK <- TRUE
      for (i in 1:len_w) {
        if (substr(corr, i, i) == "B") {
          if (substr(try_word, i, i) == substr(word, i, i)) {
            is_OK <- FALSE  # Violates: has element at position it can't be
            break
          }
        }
        if (substr(corr, i, i) == "Y") {
          if (!(grepl(substr(word, i, i), try_word) && (substr(try_word, i, i) != substr(word, i, i)))) {
            is_OK <- FALSE  # Violates: does not have element at another position than current one
            break
          }
        }
      }
      if (!is_OK) {
        break  # No other guesses needed, this try_word is wrong already
      }
    }
    if (is_OK) {
      solution <- try_word
      break  # No other try_words needed, we already have solution
    }
  }

  # Output number depending on who wins
  print(paste0("Solution for ", filename, ": ", solution))
}