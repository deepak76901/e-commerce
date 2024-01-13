import { User } from "../models/User.model.js"



export const fetchUserById =async (req,res) => {
    const {id} = req.params;

    try {
       const user = await User.findById(id , "name email id").exec()
       res.status(202).json(user)
    } catch (error) {
        res.status(405).json(error)
    }
}

export const updateUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id,req.body,{new : true}).exec()
        res.status(202).json(user)
    } catch (error) {
        res.status(405).json(error)        
    }
}