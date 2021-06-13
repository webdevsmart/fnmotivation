export const setTitle = title => {
    const el = document.querySelector('title');
    el.innerText = `${el.text} | ${title}`;
};

export const setDescription = desc => {
        const el = document.querySelector("meta[name='description']");
        el.setAttribute('content',desc)
    }