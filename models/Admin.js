var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Admin Model
 * ==========
 */
var Admin = new keystone.List('Admin');

Admin.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Admin.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Admin.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Admin.defaultColumns = 'name, email, isAdmin';
Admin.register();
