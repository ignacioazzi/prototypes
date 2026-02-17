module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            animation: {
                'slide-in-right': 'slideInRight 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
                'slide-out-right': 'slideOutRight 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
                'fadeIn': 'fadeIn 0.5s ease-in forwards',
            },
            keyframes: {
                slideInRight: {
                    'from': {
                        transform: 'translate3d(100%, 0, 0)',
                        opacity: '0.95',
                    },
                    'to': {
                        transform: 'translate3d(0, 0, 0)',
                        opacity: '1',
                    },
                },
                slideOutRight: {
                    'from': {
                        transform: 'translate3d(0, 0, 0)',
                        opacity: '1',
                    },
                    'to': {
                        transform: 'translate3d(100%, 0, 0)',
                        opacity: '0.95',
                    },
                },
                fadeIn: {
                    'from': {
                        opacity: '0',
                    },
                    'to': {
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [],
};
