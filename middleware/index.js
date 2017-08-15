/**
 * Created by winter on 6/29/2017.
 */

const middlewareObj = {};

//NEXT = GETS OUT OF MIDDLEWARE AND KEEPS GOING WITH THE PREVIOUS FUNCTION
middlewareObj.isLoggedIn = (req, res, next) => {
    //COMES WITH PASSPORT
    console.log('REQ INSIDE PASSPORT')
    if(req.isAuthenticated()) {
        console.log('REQ INSIDE')
        return next();
    }
    console.log('NOT AUTHENTICATED')
    // req.flash('error', 'You need to be logged in to do that.');
    res.redirect('/login');
};

module.exports = middlewareObj;