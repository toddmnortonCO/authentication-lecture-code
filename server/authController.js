const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        // What does this function need to run properly?  Email & password from client-side
        const { email, password } = req.body,
            db = req.app.get('get');
        
        // Check is the user already has an account with the passed in email
        const foundUser = await db.checkUser({ email });
        if (foundUser[0]) {
            return res.status(400).send("Email has already been used to register an account.")
        } 
        // Hash the user's password, insert their info into the db
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);
        
        const newUser = await db.register_user({ email, hash });

        // Place the user on a session, send that session client-side
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        // What does the function need to work properly?
        const { email, password } = req.body,
            db = req.app.get('db');
        
        // run check_user.sql query to see if the email already exists in db (returning user)
        const foundUser = await db.checkUser({ email });
        if (!foundUser[0]) {
            return res.status(404).send('Email or password not found.')
        }

        // Make sure user password matches the hashed value
        const authenticated = bcrypt.compareSync(password, foundUser[0].password)
        if (!authenticated) {
            return res.status(401).send("Email or password is incorrect.")
        }

        delete foundUser[0].password;

        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
        
    },
    logout: (req, res) => {
        // Clear the user session
        req.session.destroy();
        // Send back status code
        res.sendStatus(200);
    }
}