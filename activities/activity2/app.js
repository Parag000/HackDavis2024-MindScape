populateFilms();
let slides;

function slideIterator(slides) {
    console.log(slides.length);
    let nextIndex = 0;
    return {
        next: function () {
            return nextIndex < slides.length ?
                { value: slides[nextIndex++], done: false } :
                { done: true };
        }
    }
}

function getObjects() {
    let obj5 = {
        imageUrl: "5.png",
        description: `Notice FIVE (5) things you can see in your surrounding area. 
        These may include the blue sky, a cloud, a plant, the chair, a pen, a cup, the table, a person, or anything in your surroundings.`
    }
    let obj4 = {
        imageUrl: "4.png",
        description: `Notice FOUR (4) things you can touch near you. 
        This could be the floor, the wall, your hair, your clothes, 
        the sweat on your palms, or the coolness of a glass of water.`
    }
    let obj3 = {
        imageUrl: "3.png",
        description: `Notice THREE (3) sounds you can hear. This could be birds chirping in the 
        background, construction, a car driving nearby, or music far away.`
    }
    let obj2 = {
        imageUrl: "2.png",
        description: `Notice TWO (2) scents you can smell. This could include the smell of flowers nearby, your tea, 
        fresh-cut grass, your clothes, or simply the smell of the space you are in. Can’t find anything to smell? 
        Consider taking a short walk outside to smell nature, to the kitchen for food smells, or to the bathroom for soap.`
    }
    let obj1 = {
        imageUrl: "1.png",
        description: `Notice ONE (1) flavor you can taste. This can be a tough one – 
        but it can be as simple as the taste of your tongue! 
        Can you taste the coffee from the morning, your lunch, or a mint that you had?`
    }
    let arrayOfObjs = [obj5, obj4, obj3, obj2, obj1];
    return arrayOfObjs;
}

function generateHtml(slideInfo) {
    let html = `
        <img src="${slideInfo.imageUrl}" alt="">
        <p>${slideInfo.description}</p>
    `

    document.querySelector('.information').innerHTML = html;
}

function populateFilms() {
    let data = getObjects();
    let slides = data;
    const slide = slideIterator(slides);
    generateHtml(slide.next().value);
    document.getElementById('nextSlide').addEventListener('click', () => {
        document.querySelector('.information').innerHTML = "";
        let slidesInfo = slide.next();
        if (!slidesInfo.done) {
            generateHtml(slidesInfo.value);
        }
        else {
            document.querySelector('.information').innerHTML = "Refresh(Press F5) to start again.";
            document.getElementById('nextSlide').style.display = 'none';
            document.getElementById('goBack').style.display = 'block';
        }
    });
}
