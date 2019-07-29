//TODO: assert theme objects have all requried keys
const THEMES = [
    {
        id: '1',
        primary:'black',
        secondary: 'salmon',
        background: 'white',
        icon: {
            default: 'lightgray',
            hover: 'gray',
            selected: 'black',
        },
        inputPlaceholder: 'lightgray',
        todoBorder: '#DDDDDD'
    },
    {
        id: '2',
        primary: 'white',
        secondary: '#EAD379',
        background: '#142F43',
        icon: {
            default: 'white',
            hover: 'darkgray',
            selected: 'black',
        },
        inputPlaceholder: 'white',
        todoBorder: '#DDDDDD'
    },
    {
        id: '3',
        primary: '#243B6C',
        secondary: 'salmon',
        background: '#F4F4ED',
        icon: {
            default: 'gray',
            hover: 'darkgray',
            selected: 'black',
        },
        inputPlaceholder: '#243B6C',
        todoBorder: '#DDDDDD'
    },
    {
        id: '4',
        primary: 'white',
        secondary: '#287225',
        background: 'linear-gradient(to right, #a8e063, #88B45B)',
        icon: {
            default: 'white',
            hover: '#287225',
            selected: 'black',
        },
        inputPlaceholder: 'white',
        todoBorder: '#DDDDDD'
    },
    {
        id: '5',
        primary: 'white',
        secondary: 'cyan',
        background: 'linear-gradient(to right, #9733EE, #DA22FF)',
        icon: {
            default: 'white',
            hover: 'cyan',
            selected: 'black',
        },
        inputPlaceholder: 'white',
        todoBorder: '#DDDDDD'
    },
    {
        id: '6',
        primary: 'white',
        secondary: '#83ff00',
        background: 'linear-gradient(to right, #fc6767, #ec008c)',
        icon: {
            default: 'white',
            hover: 'lightgray',
            selected: 'black',
        },
        inputPlaceholder: 'white',
        todoBorder: '#DDDDDD'
    }
];

export default THEMES;