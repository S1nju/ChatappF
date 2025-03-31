ERtoDB - ER Diagram to Database Converter

Overview

ERtoDB is a powerful tool designed to help users create, edit, and convert Entity-Relationship (ER) diagrams into fully functional relational databases. It provides an intuitive interface for designing ER diagrams and automatically generates SQL scripts for database implementation.

Features and Functionalities

1. ER Diagram Designer
	•	Drag-and-drop interface for creating entities, attributes, and relationships.
	•	Supports different types of attributes (primary keys, foreign keys, composite, multivalued).
	•	Customizable cardinality constraints (one-to-one, one-to-many, many-to-many).
	•	Real-time validation to ensure consistency and correctness.

2. Database Schema Generation
	•	Converts the ER diagram into a relational schema.
	•	Automatically generates SQL DDL (Data Definition Language) scripts.
	•	Supports major database management systems (MySQL, PostgreSQL, SQL Server, SQLite, Oracle).
	•	Normalization checks to ensure efficient table structures.

3. Import and Export
	•	Import existing database schemas and visualize them as ER diagrams.
	•	Export ER diagrams as SQL scripts, PNG, PDF, or JSON for documentation.

4. Collaboration and Saving
	•	Save projects locally or in a database for later editing
	•	Version control to track changes over time.

5. Relationship Mapping Rules
	•	One-to-One (1:1): Creates a foreign key in one of the tables.
	•	One-to-Many (1:N): The primary key of the parent entity is stored as a foreign key in the child table.
	•	Many-to-Many (M:N): Creates an associative table containing foreign keys of both related entities.

ER Diagram Explanation

An ER diagram is a visual representation of a database structure. It consists of:
	1.	Entities: Represented as rectangles (e.g., User, Product, Order).
	2.	Attributes: Represented as ovals (e.g., name, email, price).
	3.	Relationships: Represented as diamonds (e.g., buys, owns, contains).
	4.	Cardinality: Defines the relationship type between entities (e.g., one-to-many, many-to-many).

Example Use Case

ER Diagram for an E-Commerce System

Entities:
	•	User (user_id, name, email)
	•	Product (product_id, name, price)
	•	Order (order_id, user_id, order_date)

Relationships:
	•	User places Order (1:N)
	•	Order contains Product (M:N → resolved with an associative table)
Usage:
	1.	Create an ER diagram using the visual editor.
	2.	Validate the diagram to check for errors.
	3.	Generate SQL schema and export it.
	4.	Deploy it to a database using the SQL script.

Technologies Used
	•	Frontend: React.js, Material-UI
	•	Backend: Java (Spring Boot, Spring Data JPA)
	•	Database Support: MySQL, PostgreSQL, SQLite, Oracle
	•	Libraries: Mermaid.js (for ER visualization), Sequelize (for database ORM)

Future Enhancements
	•	AI-powered ERD recommendations and auto-completion.
	•	NoSQL schema generation for MongoDB.
	•	Cloud-based real-time collaboration for teams.
