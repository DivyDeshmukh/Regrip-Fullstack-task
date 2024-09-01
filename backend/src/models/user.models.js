import dotenv from "dotenv";

dotenv.config({
   path: "./.env"
});
// loading env var here again bcoz not able to access after loading it successfully in index.js (entry file)
import { DataTypes} from "sequelize";
import sequelize from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    refreshToken: {
        type: DataTypes.STRING
    }
});

sequelize.sync().then(() => {
    console.log('User table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
});

User.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
});

User.prototype.isPasswordCorrect = async function (password) {
    console.log("isPasswordCorrect Running: ", password);
    return bcrypt.compare(password, this.password);
}

User.prototype.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this.id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

User.prototype.generateRefreshToken = function () {
    return jwt.sign(
      {
        id: this.id,
      },
      process.env.REFRESH_TOKEN_SECRET ,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
};

export default User;
