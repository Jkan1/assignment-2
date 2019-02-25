module.exports = {
        DB_HOST                 :       "localhost",
        DB_USER                 :       "root",
        DB_PASSWORD             :       "password",
        DB_NAME                 :       "testdb",
        PORT                    :       3003,
        SECRET_KEY              :       "ParkTheBus", //Secret Key for JWT
        GLOBAL_USERS            :       [],
        defaultJSON             :       {
                                                statusCode  :       200,
                                                message     :       "success",
                                                data        :       null  
                                        },
        defaultErrorJSON        :       {
                                                statusCode  :       400,
                                                message     :       "some error ocurred",
                                                data        :       null  
                                        }
}


// ///CREATE TABLE `testdb`.`users` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `email` VARCHAR(80) NOT NULL,
//   `name` VARCHAR(50) NOT NULL,
//   `password` MEDIUMTEXT NOT NULL,
//   `created_at` VARCHAR(45) NULL DEFAULT 'CURRENT_TIMESTAMP',
//   PRIMARY KEY (`id`),
//   UNIQUE INDEX `email_UNIQUE` (`email` ASC));
