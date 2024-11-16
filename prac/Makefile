DAY=03

create_day_folder:
	mkdir ${DAY}


add_empty_input_files:
	touch ${DAY}/example.txt
	touch ${DAY}/input.txt

create: create_day_folder add_empty_input_files
	cp template/main.R ${DAY}/main.R
	sed -i 's/xx/${DAY}/g' ${DAY}/main.R
