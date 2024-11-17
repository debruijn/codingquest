# Used libraries
library(readr)
library(R.utils)

mapping <- "
A 0010
E 0000
T 0001
I 0011
N 0100
O 0101
S 0110
H 0111
R 10000
D 10001
L 10010
U 10011
C 10100
M 10101
F 10110
B 10111
F 1100000
Y 1100001
W 1100010
G 1100011
P 1100100
B 1100101
V 1100110
K 1100111
Q 1101000
J 1101001
X 1101010
Z 1101011
0 1110000
1 1110001
2 1110010
3 1110011
4 1110100
5 1110101
6 1110110
7 1110111
8 1111000
9 1111001
_ 1111010
. 1111011
' 1111100
* 1111111
"

mapping <- strsplit(mapping, '\n')
mapping_list <- list()
for (row in mapping[[1]]) {
  this <- strsplit(row, ' ')[[1]]
  mapping_list[[this[2]]] <- this[1]
}

for (run_example in c(TRUE,FALSE)) {

  # Input to run
  folder <- "prac/05/"
  filename <- ifelse(run_example, "example.txt", "input.txt")
  input <- readr::read_lines(paste0(folder, filename))

  # Write solution here

  # Function to convert hexadecimal input to binary input, using intToBin() from R.utils.
  hex_to_bin <- function(x) {
    chars <- strsplit(x, "")[[1]]
    return(intToBin(strtoi(chars, 16)))
  }

  # Initialize variables: all binary numbers in one big string, and an empty result string
  bin_repr <- paste0(hex_to_bin(input), collapse="")
  res <- ""

  # One by one, match the beginning to the mapping_list above until none remain or we have found a "*"
  while ((length(bin_repr) > 0) && (substr(res, nchar(res), nchar(res)) != "*")) {
    if (substr(bin_repr, 1, 4) %in% names(mapping_list)) {
      res <- paste0(res, mapping_list[substr(bin_repr, 1, 4)])
      bin_repr <- substr(bin_repr, 5, nchar(bin_repr))
      next
    }
    if (substr(bin_repr, 1, 5) %in% names(mapping_list)) {
      res <- paste0(res, mapping_list[substr(bin_repr, 1, 5)])
      bin_repr <- substr(bin_repr, 6, nchar(bin_repr))
      next
    }
    if (substr(bin_repr, 1, 7) %in% names(mapping_list)) {
      res <- paste0(res, mapping_list[substr(bin_repr, 1, 7)])
      bin_repr <- substr(bin_repr, 8, nchar(bin_repr))
    }
  }

  # Output of solution
  print(paste0("Solution for ", filename, ": ", substr(res, 1, nchar(res)-1)))
}