/*
<xsd:group name="EG_ColorTransform">
276 <xsd:choice>
277 <xsd:element name="tint" type="CT_PositiveFixedPercentage" minOccurs="1" maxOccurs="1"/>
278 <xsd:element name="shade" type="CT_PositiveFixedPercentage" minOccurs="1" maxOccurs="1"/>
279 <xsd:element name="comp" type="CT_ComplementTransform" minOccurs="1" maxOccurs="1"/>
280 <xsd:element name="inv" type="CT_InverseTransform" minOccurs="1" maxOccurs="1"/>
281 <xsd:element name="gray" type="CT_GrayscaleTransform" minOccurs="1" maxOccurs="1"/>
282 <xsd:element name="alpha" type="CT_PositiveFixedPercentage" minOccurs="1" maxOccurs="1"/>
283 <xsd:element name="alphaOff" type="CT_FixedPercentage" minOccurs="1" maxOccurs="1"/>
284 <xsd:element name="alphaMod" type="CT_PositivePercentage" minOccurs="1" maxOccurs="1"/>
285 <xsd:element name="hue" type="CT_PositiveFixedAngle" minOccurs="1" maxOccurs="1"/>
286 <xsd:element name="hueOff" type="CT_Angle" minOccurs="1" maxOccurs="1"/>
287 <xsd:element name="hueMod" type="CT_PositivePercentage" minOccurs="1" maxOccurs="1"/>
288 <xsd:element name="sat" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
289 <xsd:element name="satOff" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
290 <xsd:element name="satMod" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
291 <xsd:element name="lum" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
292 <xsd:element name="lumOff" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
293 <xsd:element name="lumMod" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
294 <xsd:element name="red" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
295 <xsd:element name="redOff" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
296 <xsd:element name="redMod" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
297 <xsd:element name="green" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
298 <xsd:element name="greenOff" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
299 <xsd:element name="greenMod" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="blue" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
301 <xsd:element name="blueOff" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
302 <xsd:element name="blueMod" type="CT_Percentage" minOccurs="1" maxOccurs="1"/>
303 <xsd:element name="gamma" type="CT_GammaTransform" minOccurs="1" maxOccurs="1"/>
304 <xsd:element name="invGamma" type="CT_InverseGammaTransform" minOccurs="1" maxOccurs="1"/>
305 </xsd:choice>
306 </xsd:group>
*/
export default class ColorTransform {
    ParseFromXml(xml){

    }
}
