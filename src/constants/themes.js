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
            selected: 'salmon',
        },
        inputPlaceholder: 'lightgray',
        todoBorder: 'lightgray'
    },
    {
        id: '2',
        primary: 'white',
        secondary: '#EAD379', // gold
        background: '#142F43', // royal blue
        icon: {
            default: 'white',
            hover: 'darkgray',
            selected: '#EAD379', // gold
        },
        inputPlaceholder: 'white',
        todoBorder: 'gray'
    },
    {
        id: '3',
        primary: '#243B6C', // blue
        secondary: 'red',
        background: '#F4F4ED', // grayish
        icon: {
            default: 'darkgray',
            hover: 'gray',
            selected: 'salmon',
        },
        inputPlaceholder: '#243B6C', // blue
        todoBorder: '#DDDDDD'
    },
    {
        id: '4',
        primary: 'white',
        secondary: '#287225',
        background: 'linear-gradient(to right, #a8e063, #88B45B)', // green
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