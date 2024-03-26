const asyncHandler = require('express-async-handler');
const {body, ValidationResult} = require('express-validator');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.get_register = asyncHandler((req, res, next) => {

});