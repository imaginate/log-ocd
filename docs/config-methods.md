# The Config Methods
- [logOCD.setConfig](#logocdsetconfig)
- [logOCD.resetConfig](#logocdresetconfig)

## logOCD.setConfig
Allows you to update the config settings at any time.

| Param  | Type   | Details |
| :----- | :----- | :------ |
| prop   | string | ``` "<method>.<prop>" ``` see below tables |
| newVal | *      | see below tables |

### All Methods & Their Properties
| Method | Props                                                       |
| :----- | :---------------------------------------------------------- |
| all    | spaceBefore, spaceAfter, argMap, header, style, stack, exit |
| log    | spaceBefore, spaceAfter, argMap, style                      |
| pass   | spaceBefore, spaceAfter, argMap, header                     |
| error  | spaceBefore, spaceAfter, argMap, header, stack, exit        |
| warn   | spaceBefore, spaceAfter, argMap, header, stack              |
| debug  | spaceBefore, spaceAfter, argMap, header, stack              |
| fail   | spaceBefore, spaceAfter, argMap, stack                      |

### All Properties & Their Types
| Prop        | Type    | Default Value   |
| :---------- | :------ | :-------------- |
| spaceBefore | number  | ``` 1 ```       |
| spaceAfter  | number  | ``` 1 ```       |
| argMap      | boolean | ``` false ```   |
| header      | boolean | ``` true ```    |
| style       | string  | ``` "plain" ``` |
| stack       | boolean | ``` false ``` (exception: ``` "error.stack" ``` default is ``` true ```) |
| exit        | boolean | ``` true ```    |


## logOCD.resetConfig
Allows you to reset the config settings at any time.

| Param  | Type       | Details |
| :----- | :--------- | :------ |
| method | ...string= | ``` "<method>" ``` if no method is given then all methods are reset |

<br />
--
**Happy Developing,**

<a href="http://www.algorithmiv.com/log-ocd"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
