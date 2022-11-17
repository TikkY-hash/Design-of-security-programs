import { User } from "../models/userModel.js"
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors : errors.array(),
            message : "Incorrect login"
        })
    }

    const {email , password} = req.body

    const user = await User.findOne({email})

    if(!user) return res.status(404).json({
        status : "fail",
        message : "User not found"
    })

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch) return res.status(404).json({
        status : "fail",
        message : "Password is incorrect"
    })

    const token = jwt.sign(
        {userId : user.id},
        process.env.JWT_SECRET,
        {expiresIn : '1h'}
    )

    res.status(200).json({
        "status" : "success",
        token
    })

}

export const register = async (req, res) => {
   try{
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors : errors.array(),
            message : "Incorrect data"
        })
    }

    const {email , password} = req.body

    const candidate = await User.findOne({email})

    if(candidate) return res.status(400).json({message : "User alreade exist"})

    const hashedPassword = await bcrypt.hash(password, 12)

    User.create({email , password : hashedPassword})

    res.status(200).json({
        status : "Success",
        message : "User created"
    })

   }catch(err) {
    res.status(400).json({
        status : "Success",
        message : "Validation failed"
    })
   }
}

export const getCurrentUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        data: {
            message : 'Rout not provided'
        }
    }) 
}

export const changeCurrentUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        data: {
            message : 'Rout not provided'
        }
    }) 
}

export const deleteUser = (req, res) => {
    res.status(500).json({
        status : 'error',
        data: {
            message : 'Rout not provided'
        }
    }) 
}