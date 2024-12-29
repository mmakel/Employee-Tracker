# Employee-Tracker

A command line app for tracking employees
(Currently non-functional. Database can be created with PostgresSQL, and populated with the
information in seeds.sql. Database can then be connected to and checked. server.ts (and by
extension, server.js) does not seem to connect to the database, so while the inquirer package
is used, the app appears to crash once it tries to use the database it claims to be connected to.)