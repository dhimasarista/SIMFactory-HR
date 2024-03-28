/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary(); // Kolom ID sebagai primary key
        table.string('username').unique(); // Kolom Username sebagai string unik
        table.string('password').unique();
        table.integer('employee_id').unsigned(); // Kolom employee_id sebagai integer unsigned
        table.foreign('employee_id').references('id').inTable('employees'); // Kunci asing ke tabel employees
        table.boolean('is_active').defaultTo(true); // Kolom is_superuser sebagai boolean default false
        table.boolean('is_superuser').defaultTo(false); // Kolom is_superuser sebagai boolean default false
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
    return knex.schema.dropTableIfExists('users'); // Menghapus tabel jika sudah ada 
};
