from faker import Faker
import pymysql


fake = Faker()
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='hrm'
)

try:
    with connection.cursor() as cursor:
        # Function to insert data 
        def insert_dummy_data(table, fields, count=100):
            for _ in range(count):
                data = []
                for field in fields:
                   
                    if field == 'name':
                        data.append(fake.company())  
                    elif field == 'serial_number':
                        data.append(fake.unique.ean(length=13))  
                    elif field == 'description':
                        data.append(fake.sentence(nb_words=10)) 
                    elif field == 'email':
                        data.append(fake.email())
                    elif field == 'contact':
                        data.append(fake.phone_number())
                    else:
                        data.append(fake.text(max_nb_chars=20))  

                # Insert into the table
                placeholders = ', '.join(['%s'] * len(fields))
                sql = f"INSERT INTO {table} ({', '.join(fields)}) VALUES ({placeholders})"
                cursor.execute(sql, data)

      
        #insert_dummy_data('all_equipments', ['name', 'serial_number', 'description'], 30)
        insert_dummy_data('employees', ['name', 'email', 'contact'], 30)

        # Commit changes
        connection.commit()

finally:
    connection.close()

