/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table) {
        table.increments('id').primary(); // Kolom ID sebagai primary key
        table.integer('id_number').unsigned(); // Kolom position_id sebagai integer unsigned
        table.string('name').unique(); // Kolom Username sebagai string unik
        table.string("title").unique();
        table.string("bornplace").unique();
        table.date("birthdate");
        table.string("address").unique();
        table.binary("photo");
        table.binary("id_card");
        table.integer('position_id').unsigned(); // Kolom position_id sebagai integer unsigned
        table.foreign('position_id').references('id').inTable('positions'); // Kunci asing ke tabel positions
        table.integer('department_id').unsigned(); // Kolom department_id sebagai integer unsigned
        table.foreign('department_id').references('id').inTable('departments'); // Kunci asing ke tabel departments
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Kolom created_at dengan nilai default saat ini
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // Kolom updated_at dengan nilai default saat ini
        table.timestamp('deleted_at').nullable(); // Kolom deleted_at dengan nilai nullabel
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employees'); // Menghapus tabel jika sudah ada 
};
