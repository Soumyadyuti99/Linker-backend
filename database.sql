CREATE TABLE "User"(ID SERIAL PRIMARY KEY,username TEXT UNIQUE NOT NULL,password TEXT NOT NULL,email TEXT UNIQUE);
-- INSERT INTO "User"(username, password, email) VALUES('nandi','password','snandi@pw.com');
CREATE TABLE "USERVISITOR"(ID SERIAL PRIMARY KEY NOT NULL,USERID INT references "User" (ID),URL TEXT NOT NULL);
