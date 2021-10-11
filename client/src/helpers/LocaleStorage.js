export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));//rendre js objet to JSON
};

export const getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key));//rendre JSON to js objet
};

export const deleteLocalStorage = key => {
    localStorage.removeItem(key);
};

//partie client data enregistrer au browser