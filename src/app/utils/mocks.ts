import {DomSanitizer} from '@angular/platform-browser'
import {identity} from 'rambdax'

export const purehtmlTestInput = `<pre class="shiki" style="background-color: #2e3440"><code><span class="line"><span style="color: #81A1C1">export</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">function</span><span style="color: #D8DEE9FF"> </span><span style="color: #88C0D0">allPass</span><span style="color: #ECEFF4">(</span><span style="color: #D8DEE9">predicates</span><span style="color: #ECEFF4">){</span></span>
  <span class="line"><span style="color: #D8DEE9FF">  </span><span style="color: #81A1C1">return</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">input</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=&gt;</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">{</span></span>
  <span class="line"><span style="color: #D8DEE9FF">    </span><span style="color: #81A1C1">let</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">counter</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=</span><span style="color: #D8DEE9FF"> </span><span style="color: #B48EAD">0</span></span>
  <span class="line"><span style="color: #D8DEE9FF">    </span><span style="color: #81A1C1">while</span><span style="color: #D8DEE9FF"> (</span><span style="color: #D8DEE9">counter</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">&lt;</span><span style="color: #D8DEE9FF"> </span><span style="color: #D8DEE9">predicates</span><span style="color: #ECEFF4">.</span><span style="color: #D8DEE9FF">length)</span><span style="color: #ECEFF4">{</span></span>
  <span class="line"><span style="color: #D8DEE9FF">      </span><span style="color: #81A1C1">if</span><span style="color: #D8DEE9FF"> (</span><span style="color: #81A1C1">!</span><span style="color: #D8DEE9">predicates</span><span style="color: #D8DEE9FF">[ </span><span style="color: #D8DEE9">counter</span><span style="color: #D8DEE9FF"> ](</span><span style="color: #D8DEE9">input</span><span style="color: #D8DEE9FF">))</span><span style="color: #ECEFF4">{</span></span>
  <span class="line"><span style="color: #D8DEE9FF">        </span><span style="color: #81A1C1">return</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">false</span></span>
  <span class="line"><span style="color: #D8DEE9FF">      </span><span style="color: #ECEFF4">}</span></span>
  <span class="line"><span style="color: #D8DEE9FF">      </span><span style="color: #D8DEE9">counter</span><span style="color: #81A1C1">++</span></span>
  <span class="line"><span style="color: #D8DEE9FF">    </span><span style="color: #ECEFF4">}</span></span>
  
  <span class="line"><span style="color: #D8DEE9FF">    </span><span style="color: #81A1C1">return</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">true</span></span>
  <span class="line"><span style="color: #D8DEE9FF">  </span><span style="color: #ECEFF4">}</span></span>
  <span class="line"><span style="color: #ECEFF4">}</span></span></code></pre>`

export const emptySanityzer = {
  bypassSecurityTrustHtml: identity,
  sanitize: identity,
  bypassSecurityTrustStyle: identity,
  bypassSecurityTrustResourceUrl: identity,
  bypassSecurityTrustUrl: identity,
  bypassSecurityTrustScript: identity,
} as DomSanitizer
