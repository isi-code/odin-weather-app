export function currWeatherTable(weatherData){
    const currWeatherData = weatherData[0];
    const weatherCardTemplate = attachDataTable(currWeatherData);
    const weatherCard = createDOM(weatherCardTemplate);

    return weatherCard
}

function attachDataTable(data){
    return {
        tag:'div',
        prop:{ className:"weatherCard" },
        children:[
            { 
                tag:'div', 
                prop:{ className:"cardHeader" }, 
                children:[
                    { tag:'h3', prop:{ textContent: data["fullDate"] } },
                    { tag:'img', prop:{ src: data["icon"], alt: "weather icon" } },
                ] 
            },
            {
                tag:'div',
                prop:{ className:'cardBody' },
                children:[
                    { tag:'p', prop:{textContent: data["description"]} },
                    { tag:'span', prop:{textContent: data['temp']} },
                    { tag:'small', prop:{textContent: `Feels like ${data['temp']}`, style: "font-style: italic;"} }
                ]
            },
            {
                tag:'table',
                children:[
                    { 
                        tag:'thead', 
                        children:[ 
                            { 
                                tag:"tr", 
                                children:[ { tag:'th', prop:{ textContent:"Weather Details", rowSpan:2, } } ]
                            }  
                        ]
                    },
                    {
                        tag:'tbody', 
                        children:[
                            { 
                                tag:"tr", 
                                children:[ 
                                    { tag:'td', prop:{ textContent: "Sunrise" } },
                                    { tag:'td', prop:{ textContent: data["sunrise"] } }
                                ]
                            },
                            { 
                                tag:"tr", 
                                children:[ 
                                    { tag:'td', prop:{ textContent: "Sunset" } },
                                    { tag:'td', prop:{ textContent: data["sunset"] } }
                                ]
                            },
                            {
                                tag:"tr", 
                                children:[ 
                                    { tag:'td', prop:{ textContent: "Min Temperature" } },
                                    { tag:'td', prop:{ textContent: data["tempmin"] } }
                                ]
                            },
                            {
                                tag:"tr", 
                                children:[ 
                                    { tag:'td', prop:{ textContent: "Max Temperature" } },
                                    { tag:'td', prop:{ textContent: data["tempmax"] } }
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    }
}

function createDOM(obj){
    const tag = document.createElement(obj.tag);
    
    if (obj.prop)
        Object.assign(tag, obj.prop);
    
    if (obj.children){
        const content = obj.children.map( el => {
            const childTag = createDOM(el);
            return childTag
        });

        tag.append(...content);
    }

    return tag
}

// WIP Section
function attachDataModern(data){
    return {
        tag:'div',
        prop:{ className:"weatherCard" },
        children:[
            { 
                tag:'div', 
                prop:{ className:"cardHeader" }, 
                children:[
                    { tag:'h3', prop:{ textContent: data["fullDate"] } },
                    { tag:'img', prop:{ src: data["icon"], alt: "weather icon" } },
                ] 
            },
            {
                tag:'div',
                prop:{ className:'cardBody' },
                children:[
                    { tag:'p', prop:{textContent: data["description"]} },
                    { tag:'span', prop:{textContent: data['temp']} },
                    { tag:'small', prop:{textContent: `Feels like ${data['temp']}`, style: "font-style: italic;"} }
                ]
            },
            {
                tag:'div',
                prop:{ className: 'weatherHighlights' },
                children: [
                    { 
                        tag:'div',  
                        prop:{ className:"" }, 
                        children:[
                            { tag:'span', prop:{ textContent:'Sunrise', className:'subtitle'  } },
                            { tag:'span', prop:{ textContent:data["sunrise"]  } },
        
                        ] 
                    },
                    { 
                        tag:'div', 
                        prop:{ className:"" }, 
                        children:[
                            { tag:'span', prop:{ textContent:'Sunset', className:'subtitle' } },
                            { tag:'span', prop:{ textContent:data["sunset"]  } },
                        ] 
                    },
                            
                    { 
                        tag:'div', 
                        prop:{ className:"" }, 
                        children:[
                            { tag:'span', prop: { textContent:'Max Temperature', className:'subtitle' } },
                            { tag:'span', prop:{ textContent:data["tempmax"]  } },
                        ] 
                    },
                    { 
                        tag:'div', 
                        prop:{ className:"" }, 
                        children:[
                            { tag:'span', prop: { textContent:'Min Tempreature', className:'subtitle'  } },
                            { tag:'span', prop:{ textContent:data["tempmin"]  } },
                        ] 
                    }
                ]
            }
        ]
    }
}

function currWeatherModern(weatherData){
    const currWeatherData = weatherData[0];
    const weatherCardTemplate = attachDataModern(currWeatherData);
    const weatherCard = createModernLayout(weatherCardTemplate);

    return weatherCard
}
