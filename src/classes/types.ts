// https://randomuser.me/documentation

export type Password = {
	charSets?: Array<'special' | 'upper' | 'lower' | 'number'>;
	length?: string;
};

export type Fields =
	| 'gender'
	| 'name'
	| 'location'
	| 'email'
	| 'login'
	| 'registered'
	| 'dob'
	| 'phone'
	| 'cell'
	| 'id'
	| 'picture'
	| 'nat';

export type Nationalities = {
	'1.0'?: 'au' | 'br' | 'ca' | 'ch' | 'de' | 'dk' | 'es' | 'fi' | 'fr' | 'gb' | 'ie' | 'ir' | 'nl' | 'nz' | 'tr' | 'us';
	'1.1'?: Nationalities['1.0'];
	'1.2'?: Nationalities['1.0'] | 'no';
	'1.3'?: Nationalities['1.2'];
	'1.4'?: Nationalities['1.2'] | 'in' | 'ir' | 'mx' | 'nl' | 'nz' | 'rs' | 'tr' | 'ua' | 'us';
};

export type User = {
	gender: 'male' | 'female';
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		street: {
			number: number;
			name: string;
		};
		city: string;
		state: string;
		country: string;
		postcode: string | number;
		coordinates: {
			latitude: string;
			longitude: string;
		};
		timezone: {
			offset: string;
			description: string;
		};
	};
	email: string;
	login: {
		uuid: string;
		username: string;
		password: string;
		salt: string;
		md5: string;
		sha1: string;
		sha256: string;
	};
	dob: {
		date: string;
		age: number;
	};
	registered: {
		date: string;
		age: number;
	};
	phone: string;
	cell: string;
	id: {
		name: string;
		value: string;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	nat: string;
};

export type CustomUser = {
	angle: number;
	color: string;
} & User;

export type RandomUserResponse = {
	results: User[];
	info: {
		seed: string;
		results: number;
		page: number;
		version: string;
	};
};

export type RandomUserResponseError = {
	error: string;
};

export type RandomUserProps = {
	props: {
		url: 'https://randomuser.me/api/';
		format: 'json' | 'pretty' | 'csv' | 'yaml' | 'xml';
		version: '1.0' | '1.1' | '1.2' | '1.3' | '1.4';
		results?: number;
		gender?: 'male' | 'female';
		password?: Password;
		seed?: string;
		nat?: Array<Nationalities[RandomUserProps['props']['version']]>;
		page?: number;
		inc?: Fields[];
		exc?: Fields[];
		lego?: boolean;
	};
};
