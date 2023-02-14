import { animateScroll } from 'react-scroll';

export const scrollToBottom = (id) => {
    // Esto se hace porque cuando se hace click en la lista de usuarios, quiere hacer un scrollToBottom cuando todavia no esta renderizado, es un fix, se debería de refactorizar
    setTimeout(() => {
        animateScroll.scrollToBottom({
            containerId: id,
            duration: 0
        });
    }, 10)
}

export const scrollToBottomAnimated = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });
}