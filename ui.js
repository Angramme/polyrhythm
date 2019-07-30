const createSegment = (function(){
    function createSegment(onupdate, onclose=false, cache_param=null){
        var value_cache = cache_param || {
            ratios:"",
            repeat: "",
            subdivide: "",
            scale: "",
        };
        cache_param = undefined;
        
        
        var on_dispose = [];
        const dispose = function(){
            for(var ev of on_dispose){ 
                ev();
            }
            on_dispose = undefined;
            value_cache = undefined;
        }
        const bind_elem_change = function(elem, change){
            const cb = function(){
                change();
                onupdate(value_cache);
            }
            
            elem.addEventListener("change", cb);
            on_dispose.push(function(){
                elem.removeEventListener("change", cb);
            })
            
            change();
        }
        
        
        
        var DIV = document.createElement("div");
        DIV.classList.add("segment");

        var closeBTN = null;
        if(onclose){
            //console.warn("close button not implemented!!!");
            closeBTN = document.createElement("button");
            DIV.appendChild(closeBTN);
            closeBTN.innerHTML = "close &times;";
            closeBTN.id = "closebtn";

            var event = "click";
            var close_callback = function(e){
                closeBTN.removeEventListener(event, close_callback);
                onclose();
            };

            closeBTN.addEventListener(event, close_callback);
        }
        
        var ratioIN = document.createElement("input");
        DIV.appendChild(ratioIN);
        ratioIN.type = "text";
        ratioIN.name = "ratios";
        ratioIN.id = "ratiosIN";
        ratioIN.title = "integer numbers separated by a colon";
        ratioIN.value = "1:2";
        
        bind_elem_change(ratioIN, function(){
            const ratios_v = ratioIN.value;
            const ratios_e = ratios_v.trim().split(":").map(cleanEquation); //clean equatios
            const ratios_n = ratios_e.map(eval).map(v=>v?Number(v):0); //equation results
            
            var text = ratios_e.join(":");
            ratioIN.value = text;
            value_cache.ratios = ratios_n;
        });
        
        
        
        var timeOpts = document.createElement("div");
        DIV.appendChild(timeOpts);
        timeOpts.classList.add("time-options");
        
        {
            var table = document.createElement("table");
            timeOpts.appendChild(table);
            
            {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                
                for(var txt of [
                    "repeat: ",
                    "scale: ",
                    "subdivide: ",
                ]){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    td.textContent = txt;
                }
            }
            {
                var tr = document.createElement("tr");
                table.appendChild(tr);
                
                for(var data of [
                    {n:"repeat", id:"repeatIN", v:"1"},
                    {n:"scale", id:"scaleIN", v:"1"},
                    {n:"subdivide", id:"subdivideIN", v:"1:1"},
                ]){
                    var td = document.createElement("td");
                    tr.appendChild(td);
                    
                    var inp = document.createElement("input");
                    td.appendChild(inp);
                    
                    inp.type = "text";
                    inp.name = data.n;
                    inp.id = data.id;
                    inp.value = data.v;
                    
                    const name = data.n;
                    if(name != "subdivide"){
                        bind_elem_change(inp, function(){
                            const value_e = cleanEquation(inp.value);
                            const value_n = ( x=> x ? Number(x) : 0 )(eval(value_e));
                            inp.value = value_e;
                            
                            value_cache[name] = value_n;
                        });
                    }else{
                        bind_elem_change(inp, function(){
                            const value_v = inp.value.trim().split(":");
                            const value_e = value_v.map(cleanEquation);
                            const value_n = value_e.map(eval).map(r=>r?Number(r):1);
                            
                            inp.value = value_e.join(":");
                            
                            value_cache[name] = value_n.length == 1 ? value_n[0] : value_n;
                        }); 
                    }
                }
            }
        }
        
        return [DIV, dispose];
    }
    
    function cleanEquation(str){
        return str.replace(/\s|[^0-9*/+\-.]/g, '');
    }

    return createSegment;
})();