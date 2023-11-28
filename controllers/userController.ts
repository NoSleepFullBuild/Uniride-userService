import {userModel} from '@uniride/library'

export const getAllUsers = async (req : any, res: any) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
}

export const createUser = async (req: any, res: any) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création d'un utilisateur." });
    }
}

export const getUserById = async (req: any, res: any) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération d'un utilisateur." });
    }
}

export const updateUser = async (req: any, res: any) => {

    try{
        const user = await userModel.findById(req.params.id);

        if(user){
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.phoneNumber = req.body.phoneNumber;
            user.vehicle = req.body.vehicle;
            await user.save();

        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour d'un utilisateur." });
    }

}

export const deleteUser = async (req: any, res: any) => {
    
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (user) {
            res.status(200).json({ message: "Utilisateur supprimé." });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé." });
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression d'un utilisateur." });
    }
}



