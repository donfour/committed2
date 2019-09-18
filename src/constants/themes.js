//TODO: assert theme objects have all requried keys
const THEMES = [
    {
        primary:'#54545a',
        secondary: 'salmon',
        background: 'white',
        border: '#d8d8d8',
        icon: {
            default: 'lightgray',
            hover: 'gray',
            selected: 'salmon',
        },
        clock: 'lightgray'
    },
    {
        primary: 'white',
        secondary: '#EAD379', //gold
        background: '#142F43', //royal blue
        border: '#d0ebff3b',
        icon: {
            default: '#758fa2',
            hover: '#bcd7ea',
            selected: '#EAD379', //gold
        },
        clock: 'white',
        
    },
    {
        primary: '#243B6C', //blue
        secondary: 'salmon',
        background: '#F4F4ED', //grayish
        border: '#DDDDDD',
        icon: {
            default: '#c5c5b7',
            hover: 'gray',
            selected: 'salmon',
        },
        clock: '#243B6C', //blue
    },
    {
        primary: '#f1f1f1', //lightgray
        secondary: '#f1f1f1',
        background: '#222222',
        border: '#3a3a3a',
        icon: {
            default: 'gray',
            hover: '#bfbfbf', //lightgray
            selected: '#f1f1f1',
        },
        clock: '#f1f1f1', //lightgray
    },
    {
        primary: '#0b5167',
        secondary: '#ff5722',
        background: '#FFEFED',
        border: '#ecdddc',
        icon: {
            default: '#dabebb',
            hover: '#bda09c',
            selected: '#ff5722',
        },
        clock: '#0b5167',
    },
    {
        primary: 'white',
        secondary: '#ffb015',
        background: '#1F25AF',
        border: '#DDDDDD',
        icon: {
            default: '#767cff',
            hover: '#dddeff',
            selected: '#ffb015',
        },
        clock: '#e7e8ff',
    }
];

export default THEMES;