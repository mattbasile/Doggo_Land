// Routes for Site Visitors:
// GET - /api/kennels  Expected Return - A list of all our Kennels and their dogs. 

// GET - /api/dogs (returns breeds as well). Expected Return - A list of all our Dogs and their breeds.
// GET - /api/kennels/:id (id === kennel's id) Expected Return - A specified Kennel and all their dogs. 
// GET - /api/dogs/:id (id === dog's id) Expected Return - A specified dog and all their breeds.
// GET - /api/breeds/:id (id === breed's id) Expected Return - A specified breed and all the dogs of that breed.
// POST - /api/notifications Required parameters: Kennel's Id, Dog's Id and an email address from the submitter.


// Routes for Admins:
// POST - api/login Required Parameters: email and password. This will return the admin's kennel information to be stored on state as well.
// POST - api/register Required Parameters: username and password. A kennels POST will occur on the backend as well.
// GET - api/kennels/:admin_id Expected Return: all the information regarding that kennels. That includes Kennels, Dogs, and Notifications
// GET - api/notifications/:kennel_id Expected Return: all the notifications associated with the kennel.
// DELETE - api/dogs/:dog_id Expected Return: a 0 confirming the dog is no longer in our db.
// POST - api/dogs Required Paramaters: Kennel_ID. Expected Return: The new dog. 
// POST - api/breeds Expected Return: New breed returned
// POST - api/dog_breeds Required Parameters: Dog_ID and Breed_ID. This will allow us to connect our new dog to previous breeds or brand new ones.
// PUT - api/dogs/:dog_id Expected Return: The updated dog and all their old and new information.
// PUT - api/kennels/:kennel_id Expected Return: Updated kennel with all it's previous and new information. 
// DELETE  - api/kennels/:kennel_id Expected Return: A 0 that confirms the kennels been removed.