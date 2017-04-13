/*
    Banner
*/
import * as React from 'react';
import {Link,hashHistory} from 'react-router';
import * as OTF from './ObjectTypeFormat';
import * as Utils from './Utils';

let UEU = Utils.ElementUtile;
let MoveNum = Math.ceil(Utils.WindowInfo.windowSize().w / 5);
// let MoveNum = 5;
let timer : any,moveTimer : any;
export class Banner extends React.Component<{bannerArray:OTF.BannerInfo[]},any>{
    constructor(){
        super();
        let width = Utils.WindowInfo.windowSize().w >= 800 ? 800 : Utils.WindowInfo.windowSize().w ;
        this.state = {
            width : width,
            pressTimes : 0,
            startCoord : {
                x : 0,
                y : 0
            },
            endCoord : {
                x : 0,
                y : 0
            },
            moveState : false,
            mouseUpState : true,
            timerState : false,
            slideIndex : 0
        }
    }
    componentDidMount(){
        let me = this;
        Utils.WindowResize(function(){
            me.setState({width : Utils.WindowInfo.windowSize().w >= 800 ? 800 : Utils.WindowInfo.windowSize().w});
        });
        this.autoPlay();
    }
    getElementsArray(element:any){
        if(!element){return;}
        return Array.prototype.slice.call(UEU.getTag('.'+ (typeof element == 'object' ? element.className : element)));
    }
    getElementIndex(element:any){
        return UEU.getAttr(element,'data-index');
    }
    getElementsFisrtState(element:any){
        let index = UEU.getAttr(element,'data-index');
        return index == 0 ? true : false;
    }
    getElementsLastState(element:any){
        let elementArray = UEU.getTag('.'+element.className);
        let index = this.getElementIndex(element);
        return index == elementArray.length - 1 ? true : false;
    }
    initLayout(element:any,direction:string){
        let width = this.state.width;
        let tagBTB = UEU.getTag('#tagBannerTmpBox');
        let num;
        if(direction == 'left'){
            num = 0;
            UEU.setCss(tagBTB,{left : width + 'px'});
        }else{
            num = '-' + width;
            UEU.setCss(tagBTB,{left : '0px'});
        }
        UEU.setCss(this.getElementsArray(element),{marginLeft : num + 'px'});
    }
    MouseDown(event:any){
        if(!event){return;}
        if(this.state.timerState){return;}
        event.preventDefault();
        this.clearTimer();
        this.setState({
            startCoord : {
                x : event.targetTouches ? event.targetTouches[0].clientX : event.pageX,
                y : event.targetTouches ? event.targetTouches[0].clientY : event.pageY
            },
            moveState : false,
            mouseUpState : false
        });
        let index = this.getElementIndex(event.currentTarget);
        let elementArray = this.getElementsArray(event.currentTarget);
        let tagBTB = UEU.getTag('#tagBannerTmpBox');
        let initIndex = 0;
        if(index == 0){
            initIndex = elementArray.length - 1;
            UEU.setCss(tagBTB,{left : '-' + this.state.width + 'px'});
        }else{
            UEU.setCss(tagBTB,{left : this.state.width + 'px'});
        }
        UEU.setAttr(tagBTB,{
            'data-index' : UEU.getAttr(elementArray[initIndex],'data-index'),
            'data-to' : UEU.getAttr(elementArray[initIndex],'data-to')
        })
        UEU.setAttr(tagBTB.getElementsByTagName('img')[0],{
            src : UEU.getAttr(elementArray[initIndex].getElementsByTagName('img')[0],'src')
        });
    }
    MouseMove(event:any){
        if(this.state.timerState){return;}
        if(this.state.mouseUpState){return;}
        let [x,y] = [
            event.targetTouches ? event.targetTouches[0].clientX : event.pageX,
            event.targetTouches ? event.targetTouches[0].clientY : event.pageY
        ]
        this.setState({
            endCoord : {
                x : x,
                y : y
            },
            moveState : true
        })
        let initX = this.state.startCoord.x;
        let space = Math.abs(initX - x);
        let element = event.currentTarget;
        let tagBTB = UEU.getTag('#tagBannerTmpBox');
        let width = this.state.width;

        let index = this.getElementIndex(event.currentTarget);
        let elementArray = this.getElementsArray(event.currentTarget);
        if(initX > x){
            UEU.setCss(element,{
                width : this.state.width,
                marginLeft : '-' + space + 'px'
            });
            if(this.getElementsLastState(element)){
                UEU.setCss(tagBTB,{left : (width - space) + 'px'});
            }
        }else if(initX < x){
            let elementML = Math.abs(parseInt(UEU.getCss(element,'marginLeft') || 0));
            let tmp = elementML + (space - elementML);
            let btbL = Math.abs(parseInt(UEU.getCss(tagBTB,'left') || 0));
            if(index == 0){
                 UEU.setCss(element,{
                    width : width,
                    marginLeft : tmp + 'px'
                });
                UEU.setCss(tagBTB,{left : '-' + (width - space) + 'px'});
            }else{
                let previousIndex = index - 1 >= 0 ? index - 1 : 0;
                let previousElement = elementArray[previousIndex];
                let pEML= Math.abs(parseInt(UEU.getCss(previousElement,'marginLeft') || 0));
                UEU.setCss(previousElement,{marginLeft : '-' + (width - space) + 'px'});
            }
        }
    }
    MouseUp(event:any){
        if(!event){return;}
        if(this.state.timerState){return;}
        event.preventDefault();
        this.setState({mouseUpState : true});
        let [startX,endX] = [this.state.startCoord.x,this.state.endCoord.x];
        let element = event.currentTarget;
        let left = Math.abs(parseInt(element.style.marginLeft));
        if(!this.state.moveState){
            console.info('点击事件 ********')
            hashHistory.replace(event.currentTarget.getAttribute('data-to'));
            return;
        }
        let firstState = this.getElementsFisrtState(element);
        let lastState = this.getElementsLastState(element);
        let width = this.state.width;
        let index = this.getElementIndex(element);
        let tagBTB = UEU.getTag('#tagBannerTmpBox');
        let elementArray = UEU.getTag('.'+element.className);

        if(Math.abs(startX - endX) >= MoveNum){
            if(startX > endX){
                this.setState({slideIndex : index});
                this.slide('left', () => {
                    this.autoPlay();
                });
            }else{
                this.setState({slideIndex : index == 0 ? elementArray.length - 1 : --index});
                this.slide('right', () => {
                    this.autoPlay();
                });
            }
        }else{
            if(startX > endX){
                let timer = setInterval( () => {
                    let elementML = Math.abs(parseInt(element.style.marginLeft));
                    let btbML = Math.abs(parseInt(UEU.getCss(tagBTB,'left')));
                    if(elementML - MoveNum <= 0){
                        UEU.setCss(element,{marginLeft : '0px'});
                        UEU.setCss(tagBTB,{left : width + 'px'});
                        clearInterval(timer);
                        this.autoPlay();
                        this.setState({timerState : false});
                    }else{
                        this.setState({timerState : true});
                        UEU.setCss(element,{marginLeft : '-' + (elementML - MoveNum) + 'px'});
                        UEU.setCss(tagBTB,{left : (btbML + MoveNum) + 'px'});
                    }
                },50);
            }else{
                let timer = setInterval( () => {
                    let elementML = Math.abs(parseInt(element.style.marginLeft));
                    let btbML = Math.abs(parseInt(UEU.getCss(tagBTB,'left')));
                    if(firstState){
                        if(elementML - MoveNum <= 0){
                            UEU.setCss(element,{marginLeft : '0px'});
                            UEU.setCss(tagBTB,{left : width + 'px'});
                            clearInterval(timer);
                            this.autoPlay();
                            this.setState({timerState : false});
                        }else{
                            UEU.setCss(element,{marginLeft : '-' + (elementML - MoveNum) + 'px'});
                            UEU.setCss(tagBTB,{left : (btbML + MoveNum) + 'px'});
                            this.setState({timerState : true});
                        }
                    }else{
                        if(elementML - MoveNum <= 0){
                            UEU.setCss(element,{marginLeft : '0px'});
                            UEU.setCss(tagBTB,{left : width + 'px'});
                            clearInterval(timer);
                            this.autoPlay();
                            this.setState({timerState : false});
                        }else{
                            UEU.setCss(element,{marginLeft : '-' + (elementML - MoveNum) + 'px'});
                            UEU.setCss(tagBTB,{left : (btbML + MoveNum) + 'px'});
                            this.setState({timerState : true});
                        }
                    }
                },50);
            }
        }
    }
    autoPlay(){
        this.clearTimer();
        timer = setInterval( () => {
            this.slide('','');
        },3000);
    }
    slide(direction:any,callback:any){
        clearInterval(moveTimer);
        let act = direction || 'left';
        let width = this.state.width;
        let elementArray = this.getElementsArray('G_Banner_Container');
        let tagBTB = UEU.getTag('#tagBannerTmpBox');
        let slideIndex = this.state.slideIndex;
        if(elementArray[slideIndex]){
            let element = elementArray[slideIndex];
            let firstState = this.getElementsFisrtState(element);
            let lastState = this.getElementsLastState(element);
            let initIndex = 0;
            if(slideIndex == 0){
                if(!direction){
                    initIndex = elementArray.length - 1;
                    UEU.setCss(tagBTB,{left : '-' + width + 'px'});
                }
            }else{
                if(!direction){
                    UEU.setCss(tagBTB,{left : width + 'px'});                           
                }
            }
            UEU.setAttr(tagBTB,{
                'data-index' : UEU.getAttr(elementArray[initIndex],'data-index'),
                'data-to' : UEU.getAttr(elementArray[initIndex],'data-to')
            })
            UEU.setAttr(tagBTB.getElementsByTagName('img')[0],{
                src : UEU.getAttr(elementArray[initIndex].getElementsByTagName('img')[0],'src')
            });
            let previousIndex = slideIndex - 1 >= 0 ? slideIndex - 1 : 0;
            let previousElement = elementArray[previousIndex];
            moveTimer = setInterval( () => {
                let eML = Math.abs(parseInt(UEU.getCss(element,'marginLeft') || 0));
                let btbL = Math.abs(parseInt(UEU.getCss(tagBTB,'left') || 0));
                if(act == 'left'){
                    if(lastState){
                        if(eML + MoveNum >= width){
                            clearInterval(moveTimer);
                            if(callback){callback()}
                            UEU.setCss(tagBTB,{left : '0px'});
                            UEU.setCss(element,{marginLeft : '-' + width + 'px'});
                            this.initLayout(element,'left');
                            this.setState({timerState : false});
                        }else{
                            UEU.setCss(element,{marginLeft : '-' + (eML + MoveNum) + 'px'});
                            if(btbL <= MoveNum){
                                UEU.setCss(tagBTB,{left : '0px'});
                            }else{
                                UEU.setCss(tagBTB,{left : (btbL - MoveNum) + 'px'});
                            }
                            this.setState({timerState : true});
                        }
                    }else{
                        if(eML + MoveNum >= this.state.width){
                        element.style.marginLeft = '-' + this.state.width + 'px';
                            clearInterval(moveTimer);
                            if(callback){callback()}
                            this.setState({timerState : false});
                        }else{
                            element.style.marginLeft = '-' + (eML + MoveNum) + 'px';
                            this.setState({timerState : true});
                        }
                    }
                }else if(act == 'right'){
                    if(firstState){
                        if(eML + MoveNum >= width){
                            clearInterval(moveTimer);
                            if(callback){callback()}
                            UEU.setCss(element,{marginLeft : width + 'px'});
                            this.initLayout(element,'right');
                            UEU.setCss(elementArray[elementArray.length - 1],{marginLeft : '0px'});
                            UEU.setCss(tagBTB,{left : width + 'px'});
                            this.setState({timerState : false});
                        }else{
                            UEU.setCss(element,{marginLeft : (eML + MoveNum) + 'px'});
                            UEU.setCss(tagBTB,{left : '-' + (btbL - MoveNum) + 'px'});
                            UEU.setCss(tagBTB,{left : '-' + (btbL - MoveNum) + 'px'});
                            this.setState({timerState : true});
                        }
                    }else{
                        let pEML= Math.abs(parseInt(UEU.getCss(previousElement,'marginLeft') || 0));
                        if(pEML - MoveNum <= 0){
                            clearInterval(moveTimer);
                            if(callback){callback()}
                            previousElement.style.marginLeft = '0px';
                            this.setState({timerState : false});
                        }else{
                            previousElement.style.marginLeft = '-' + (pEML - MoveNum) + 'px';
                            this.setState({timerState : true});
                        }
                    }
                }
            },50);
            if(act == 'left'){
                this.setState({slideIndex : ++slideIndex > elementArray.length - 1 ? 0 : slideIndex});
            }else if(act == 'right'){
                this.setState({slideIndex :slideIndex == 0 ? elementArray.length - 1 : --slideIndex});
            }
        }else{
            this.setState({slideIndex : 0});
        }
    }
    clearTimer(){
        clearInterval(moveTimer);
        clearInterval(timer);
    }
    render(){
        let ba = this.props.bannerArray;
        let width = this.state.width;
        if(width >= 800){width = 800;}
        let outerLayerStyle = {width : width * (ba.length + 1) + 'px'};
        let innerLayerStyle = {width : width + 'px'};
        let elements = ba.map((banner : OTF.BannerInfo,index : number) => {
            return <div className="G_Banner_Container" style={innerLayerStyle} data-to={`/play/${banner.game_id}`} data-index={index} 
                        onTouchStart={ Utils.ClientInfo() != "pc" ? (event) => this.MouseDown(event) : this.MouseDown  } 
                        onTouchMove={ Utils.ClientInfo() != "pc" ? (event) => this.MouseMove(event) : this.MouseMove  } 
                        onTouchEnd={ Utils.ClientInfo() != "pc" ? (event) => this.MouseUp(event) : this.MouseUp  } 
                        onMouseDown={ Utils.ClientInfo() == "pc" ? (event) => this.MouseDown(event) : this.MouseDown  } 
                        onMouseMove={ Utils.ClientInfo() == "pc" ? (event) => this.MouseMove(event) : this.MouseMove  } 
                        onMouseUp={ Utils.ClientInfo() == "pc" ? (event) => this.MouseUp(event) : this.MouseUp }
                    >
                    <img src={banner.ad_img}/>
                </div>;
        });
        let divLayerStyle = {
            width : width + 'px',
            left : width + 'px'
        }
        let position = (<div id="tagBannerTmpBox" className="G_Banner_TmpBox" style={divLayerStyle} data-to="" data-index={elements.length}
                onTouchStart={ Utils.ClientInfo() != "pc" ? (event) => this.MouseDown(event) : this.MouseDown  } 
                        onTouchMove={ Utils.ClientInfo() != "pc" ? (event) => this.MouseMove(event) : this.MouseMove  } 
                        onTouchEnd={ Utils.ClientInfo() != "pc" ? (event) => this.MouseUp(event) : this.MouseUp  } 
                        onMouseDown={ Utils.ClientInfo() == "pc" ? (event) => this.MouseDown(event) : this.MouseDown  } 
                        onMouseMove={ Utils.ClientInfo() == "pc" ? (event) => this.MouseMove(event) : this.MouseMove  } 
                        onMouseUp={ Utils.ClientInfo() == "pc" ? (event) => this.MouseUp(event) : this.MouseUp }
                    >
                    <img src=""/>
                </div>);
        return(
            <div style={{position:"relative"}}>
            <div style={outerLayerStyle}>
                {elements}
            </div>
            {position}
            </div>
        );
    }
}