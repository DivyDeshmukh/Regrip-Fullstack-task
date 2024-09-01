import {asyncHandler} from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { Sequelize } from "sequelize";

const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({validate: false});
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        );
    }
}

const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if ([username, email, password].some(item => item.trim() === "")) {
        throw new ApiError(400, "Invalid Error Data");
    } 

    const isAlreadyPresent = await User.findOne({
        where: {
            [Sequelize.Op.or]: [
                { username },
                { email }
            ]
        }
    });

    if (isAlreadyPresent) {
        throw new ApiError(400, "User with this email id or username already present");
    }

    const createUser = await User.create({
        username,
        email,
        password
    });

    if (!createUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const registeredUser = await User.findOne({
        where: { id: createUser.id },
        attributes: { exclude: ['password', 'refreshToken'] }
    });

    if (!registeredUser) {
        throw new ApiError(500, "Something went wrong while fetching the newly created user");
    }

    return res.status(200)
                .json(new ApiResponse(200, registeredUser, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if ([email, password].some((item) => item.trim() === "")) {
        throw new ApiError(400, "Invalid login credentials");
    }

    const isUserExist = await User.findOne({
        where: {
            email
        }
    });

    if (!isUserExist) {
        throw new ApiError(400, "User with this email do not exist");
    }

    const isPasswordValid = await isUserExist.isPasswordCorrect(password);
    
    if (!isPasswordValid) {
        throw new ApiError(400, "Please enter the correct password");
    }

    const {accessToken, refreshToken} = await generateAccessRefreshTokens(isUserExist?.id);
    console.log(accessToken, refreshToken);

    const loggedInUser = await User.findOne({
        where: { id: isUserExist.id },
        attributes: { exclude: ['password', 'refreshToken'] }
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
                .cookie("accessToken", accessToken, {
                    ...options
                })
                .cookie("refreshToken", refreshToken, {
                    ...options
                })
                .json(
                    new ApiResponse(
                        200,
                        {loggedInUser},
                        "User logged in successfully"
                    )
                );
});

const logout = asyncHandler(async (req, res) => {
    await User.update(
        { refreshToken: null }, // Set the refreshToken field to null
        {
          where: { id: req.user.id }, // Adjust based on your primary key
          returning: true, // Optional: returns the updated record
        }
    );
  
    const options = {
      httpOnly: true,
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
});

const fetchUserData = asyncHandler(async(req, res) => {
    return res.status(200)
              .json(new ApiResponse(
                200,
                {
                    userData: req.user,
                    "recentActivities": [
                      {
                        "id": 101,
                        "type": "post",
                        "content": "Completed a new feature implementation on the dashboard.",
                        "timestamp": "2024-09-01T10:15:30Z"
                      },
                      {
                        "id": 102,
                        "type": "comment",
                        "content": "Commented on Jane’s post about UI/UX design trends.",
                        "timestamp": "2024-09-01T09:45:00Z"
                      },
                      {
                        "id": 103,
                        "type": "like",
                        "content": "Liked a post from Michael on JavaScript best practices.",
                        "timestamp": "2024-09-01T08:30:00Z"
                      },
                      {
                        "id": 104,
                        "type": "follow",
                        "content": "Started following @janedoe.",
                        "timestamp": "2024-08-31T17:20:00Z"
                      }
                    ],
                    "statistics": {
                      "posts": 120,
                      "followers": 350,
                      "following": 180,
                      "likesReceived": 2100,
                      "commentsMade": 450,
                      "shares": 75
                    }
                  },
                  "User Data Fetched Successfully"    
              ));  
});

export {
    register,
    login,
    logout,
    fetchUserData
}



