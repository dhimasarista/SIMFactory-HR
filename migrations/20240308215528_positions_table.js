/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('positions', function(table) {
        table.increments('id').primary(); // Kolom ID sebagai primary key
        table.string('name').unique(); // Kolom Username sebagai string unik
        table.integer('department_id').unsigned(); // Kolom department_id sebagai integer unsigned
        table.foreign('department_id').references('id').inTable('departments'); // Kunci asing ke tabel employees
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
    return knex.schema.dropTableIfExists('positions'); // Menghapus tabel jika sudah ada 
};
