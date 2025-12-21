---
title: "python-docs Documentation"
source: "https://docs.python.org/3.11/library/functions.html"
version: "3.11"
scraped: "2025-12-21T01:38:56.129Z"
tokens: 24433
---
# python-docs Documentation

> Version: 3.11
> Source: https://docs.python.org/3.11/library/functions.html
> Generated: 12/20/2025, 6:38:56 PM

### python-docs

#### _3.11_library_functions.html.md

> Source: https://docs.python.org/3.11/library/functions.html
> Scraped: 12/20/2025, 6:38:55 PM

The Python interpreter has a number of functions and types built into it that are always available. They are listed here in alphabetical order.

Built-in Functions

**A** [`abs()`](_3_library_functions.html.md#abs)

[`aiter()`](_3_library_functions.html.md#aiter)

[`all()`](_3_library_functions.html.md#all)

[`anext()`](_3_library_functions.html.md#anext)

[`any()`](_3_library_functions.html.md#any)

[`ascii()`](_3_library_functions.html.md#ascii)

**B** [`bin()`](_3_library_functions.html.md#bin)

[`bool()`](_3_library_functions.html.md#bool)

[`breakpoint()`](_3_library_functions.html.md#breakpoint)

[`bytearray()`](_3_library_functions.html.md#func-bytearray)

[`bytes()`](_3_library_functions.html.md#func-bytes)

**C** [`callable()`](_3_library_functions.html.md#callable)

[`chr()`](_3_library_functions.html.md#chr)

[`classmethod()`](_3_library_functions.html.md#classmethod)

[`compile()`](_3_library_functions.html.md#compile)

[`complex()`](_3_library_functions.html.md#complex)

**D** [`delattr()`](_3_library_functions.html.md#delattr)

[`dict()`](_3_library_functions.html.md#func-dict)

[`dir()`](_3_library_functions.html.md#dir)

[`divmod()`](_3_library_functions.html.md#divmod)

**E** [`enumerate()`](_3_library_functions.html.md#enumerate)

[`eval()`](_3_library_functions.html.md#eval)

[`exec()`](_3_library_functions.html.md#exec)

**F** [`filter()`](_3_library_functions.html.md#filter)

[`float()`](_3_library_functions.html.md#float)

[`format()`](_3_library_functions.html.md#format)

[`frozenset()`](_3_library_functions.html.md#func-frozenset)

**G** [`getattr()`](_3_library_functions.html.md#getattr)

[`globals()`](_3_library_functions.html.md#globals)

**H** [`hasattr()`](_3_library_functions.html.md#hasattr)

[`hash()`](_3_library_functions.html.md#hash)

[`help()`](_3_library_functions.html.md#help)

[`hex()`](_3_library_functions.html.md#hex)

**I** [`id()`](_3_library_functions.html.md#id)

[`input()`](_3_library_functions.html.md#input)

[`int()`](_3_library_functions.html.md#int)

[`isinstance()`](_3_library_functions.html.md#isinstance)

[`issubclass()`](_3_library_functions.html.md#issubclass)

[`iter()`](_3_library_functions.html.md#iter)

**L** [`len()`](_3_library_functions.html.md#len)

[`list()`](_3_library_functions.html.md#func-list)

[`locals()`](_3_library_functions.html.md#locals)

**M** [`map()`](_3_library_functions.html.md#map)

[`max()`](_3_library_functions.html.md#max)

[`memoryview()`](_3_library_functions.html.md#func-memoryview)

[`min()`](_3_library_functions.html.md#min)

**N** [`next()`](_3_library_functions.html.md#next)

**O** [`object()`](_3_library_functions.html.md#object)

[`oct()`](_3_library_functions.html.md#oct)

[`open()`](_3_library_functions.html.md#open)

[`ord()`](_3_library_functions.html.md#ord)

**P** [`pow()`](_3_library_functions.html.md#pow)

[`print()`](_3_library_functions.html.md#print)

[`property()`](_3_library_functions.html.md#property)

**R** [`range()`](_3_library_functions.html.md#func-range)

[`repr()`](_3_library_functions.html.md#repr)

[`reversed()`](_3_library_functions.html.md#reversed)

[`round()`](_3_library_functions.html.md#round)

**S** [`set()`](_3_library_functions.html.md#func-set)

[`setattr()`](_3_library_functions.html.md#setattr)

[`slice()`](_3_library_functions.html.md#slice)

[`sorted()`](_3_library_functions.html.md#sorted)

[`staticmethod()`](_3_library_functions.html.md#staticmethod)

[`str()`](_3_library_functions.html.md#func-str)

[`sum()`](_3_library_functions.html.md#sum)

[`super()`](_3_library_functions.html.md#super)

**T** [`tuple()`](_3_library_functions.html.md#func-tuple)

[`type()`](_3_library_functions.html.md#type)

**V** [`vars()`](_3_library_functions.html.md#vars)

**Z** [`zip()`](_3_library_functions.html.md#zip)

**\_** [`__import__()`](_3_library_functions.html.md#import__)

abs(_x_)[¶](_3_library_functions.html.md#abs)

Return the absolute value of a number. The argument may be an integer, a floating point number, or an object implementing [`__abs__()`](_3_reference_datamodel.html.md#object.__abs__). If the argument is a complex number, its magnitude is returned.

aiter(_async\_iterable_)[¶](_3_library_functions.html.md#aiter)

Return an [asynchronous iterator](_3_glossary.html.md#term-asynchronous-iterator) for an [asynchronous iterable](_3_glossary.html.md#term-asynchronous-iterable). Equivalent to calling `x.__aiter__()`.

Note: Unlike [`iter()`](_3_library_functions.html.md#iter), [`aiter()`](_3_library_functions.html.md#aiter) has no 2-argument variant.

New in version 3.10.

all(_iterable_)[¶](_3_library_functions.html.md#all)

Return `True` if all elements of the _iterable_ are true (or if the iterable is empty). Equivalent to:
```
def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True
```
_awaitable_ anext(_async\_iterator_)[¶](_3_library_functions.html.md#anext) _awaitable_ anext(_async\_iterator_, _default_)

When awaited, return the next item from the given [asynchronous iterator](_3_glossary.html.md#term-asynchronous-iterator), or _default_ if given and the iterator is exhausted.

This is the async variant of the [`next()`](_3_library_functions.html.md#next) builtin, and behaves similarly.

This calls the [`__anext__()`](_3_reference_datamodel.html.md#object.__anext__) method of _async\_iterator_, returning an [awaitable](_3_glossary.html.md#term-awaitable). Awaiting this returns the next value of the iterator. If _default_ is given, it is returned if the iterator is exhausted, otherwise [`StopAsyncIteration`](_3_library_exceptions.html.md#StopAsyncIteration) is raised.

New in version 3.10.

any(_iterable_)[¶](_3_library_functions.html.md#any)

Return `True` if any element of the _iterable_ is true. If the iterable is empty, return `False`. Equivalent to:
```
def any(iterable):
    for element in iterable:
        if element:
            return True
    return False
```
ascii(_object_)[¶](_3_library_functions.html.md#ascii)

As [`repr()`](_3_library_functions.html.md#repr), return a string containing a printable representation of an object, but escape the non-ASCII characters in the string returned by [`repr()`](_3_library_functions.html.md#repr) using `\x`, `\u`, or `\U` escapes. This generates a string similar to that returned by [`repr()`](_3_library_functions.html.md#repr) in Python 2.

bin(_x_)[¶](_3_library_functions.html.md#bin)

Convert an integer number to a binary string prefixed with “0b”. The result is a valid Python expression. If _x_ is not a Python [`int`](_3_library_functions.html.md#int) object, it has to define an [`__index__()`](_3_reference_datamodel.html.md#object.__index__) method that returns an integer. Some examples:
```
\>>> bin(3)
'0b11'
\>>> bin(\-10)
'-0b1010'
```
If the prefix “0b” is desired or not, you can use either of the following ways.
```
\>>> format(14, '#b'), format(14, 'b')
('0b1110', '1110')
\>>> f'{14:#b}', f'{14:b}'
('0b1110', '1110')
```
See also [`format()`](_3_library_functions.html.md#format) for more information.

_class_ bool(_x\=False_)[¶](_3_library_functions.html.md#bool)

Return a Boolean value, i.e. one of `True` or `False`. _x_ is converted using the standard [truth testing procedure](_3_library_stdtypes.html.md#truth). If _x_ is false or omitted, this returns `False`; otherwise, it returns `True`. The [`bool`](_3_library_functions.html.md#bool) class is a subclass of [`int`](_3_library_functions.html.md#int) (see [Numeric Types — int, float, complex](_3_library_stdtypes.html.md#typesnumeric)). It cannot be subclassed further. Its only instances are `False` and `True` (see [Boolean Values](_3_library_stdtypes.html.md#bltin-boolean-values)).

Changed in version 3.7: _x_ is now a positional-only parameter.

breakpoint(_\*args_, _\*\*kws_)[¶](_3_library_functions.html.md#breakpoint)

This function drops you into the debugger at the call site. Specifically, it calls [`sys.breakpointhook()`](_3_library_sys.html.md#sys.breakpointhook), passing `args` and `kws` straight through. By default, `sys.breakpointhook()` calls [`pdb.set_trace()`](_3_library_pdb.html.md#pdb.set_trace) expecting no arguments. In this case, it is purely a convenience function so you don’t have to explicitly import [`pdb`](_3_library_pdb.html.md#module-pdb) or type as much code to enter the debugger. However, [`sys.breakpointhook()`](_3_library_sys.html.md#sys.breakpointhook) can be set to some other function and [`breakpoint()`](_3_library_functions.html.md#breakpoint) will automatically call that, allowing you to drop into the debugger of choice. If [`sys.breakpointhook()`](_3_library_sys.html.md#sys.breakpointhook) is not accessible, this function will raise [`RuntimeError`](_3_library_exceptions.html.md#RuntimeError).

By default, the behavior of [`breakpoint()`](_3_library_functions.html.md#breakpoint) can be changed with the [`PYTHONBREAKPOINT`](_3_using_cmdline.html.md#envvar-PYTHONBREAKPOINT) environment variable. See [`sys.breakpointhook()`](_3_library_sys.html.md#sys.breakpointhook) for usage details.

Note that this is not guaranteed if [`sys.breakpointhook()`](_3_library_sys.html.md#sys.breakpointhook) has been replaced.

Raises an [auditing event](_3_library_sys.html.md#auditing) `builtins.breakpoint` with argument `breakpointhook`.

New in version 3.7.

_class_ bytearray(_source\=b''_) _class_ bytearray(_source_, _encoding_) _class_ bytearray(_source_, _encoding_, _errors_)

Return a new array of bytes. The [`bytearray`](_3_library_stdtypes.html.md#bytearray) class is a mutable sequence of integers in the range 0 <= x < 256. It has most of the usual methods of mutable sequences, described in [Mutable Sequence Types](_3_library_stdtypes.html.md#typesseq-mutable), as well as most methods that the [`bytes`](_3_library_stdtypes.html.md#bytes) type has, see [Bytes and Bytearray Operations](_3_library_stdtypes.html.md#bytes-methods).

The optional _source_ parameter can be used to initialize the array in a few different ways:

*   If it is a _string_, you must also give the _encoding_ (and optionally, _errors_) parameters; [`bytearray()`](_3_library_stdtypes.html.md#bytearray) then converts the string to bytes using [`str.encode()`](_3_library_stdtypes.html.md#str.encode).
    
*   If it is an _integer_, the array will have that size and will be initialized with null bytes.
    
*   If it is an object conforming to the [buffer interface](_3_c-api_buffer.html.md#bufferobjects), a read-only buffer of the object will be used to initialize the bytes array.
    
*   If it is an _iterable_, it must be an iterable of integers in the range `0 <= x < 256`, which are used as the initial contents of the array.
    

Without an argument, an array of size 0 is created.

See also [Binary Sequence Types — bytes, bytearray, memoryview](_3_library_stdtypes.html.md#binaryseq) and [Bytearray Objects](_3_library_stdtypes.html.md#typebytearray).

_class_ bytes(_source\=b''_) _class_ bytes(_source_, _encoding_) _class_ bytes(_source_, _encoding_, _errors_)

Return a new “bytes” object which is an immutable sequence of integers in the range `0 <= x < 256`. [`bytes`](_3_library_stdtypes.html.md#bytes) is an immutable version of [`bytearray`](_3_library_stdtypes.html.md#bytearray) – it has the same non-mutating methods and the same indexing and slicing behavior.

Accordingly, constructor arguments are interpreted as for [`bytearray()`](_3_library_stdtypes.html.md#bytearray).

Bytes objects can also be created with literals, see [String and Bytes literals](_3_reference_lexical_analysis.html.md#strings).

See also [Binary Sequence Types — bytes, bytearray, memoryview](_3_library_stdtypes.html.md#binaryseq), [Bytes Objects](_3_library_stdtypes.html.md#typebytes), and [Bytes and Bytearray Operations](_3_library_stdtypes.html.md#bytes-methods).

callable(_object_)[¶](_3_library_functions.html.md#callable)

Return [`True`](_3_library_constants.html.md#True) if the _object_ argument appears callable, [`False`](_3_library_constants.html.md#False) if not. If this returns `True`, it is still possible that a call fails, but if it is `False`, calling _object_ will never succeed. Note that classes are callable (calling a class returns a new instance); instances are callable if their class has a [`__call__()`](_3_reference_datamodel.html.md#object.__call__) method.

New in version 3.2: This function was first removed in Python 3.0 and then brought back in Python 3.2.

chr(_i_)[¶](_3_library_functions.html.md#chr)

Return the string representing a character whose Unicode code point is the integer _i_. For example, `chr(97)` returns the string `'a'`, while `chr(8364)` returns the string `'€'`. This is the inverse of [`ord()`](_3_library_functions.html.md#ord).

The valid range for the argument is from 0 through 1,114,111 (0x10FFFF in base 16). [`ValueError`](_3_library_exceptions.html.md#ValueError) will be raised if _i_ is outside that range.

@classmethod[¶](_3_library_functions.html.md#classmethod)

Transform a method into a class method.

A class method receives the class as an implicit first argument, just like an instance method receives the instance. To declare a class method, use this idiom:
```
class C:
    @classmethod
    def f(cls, arg1, arg2): ...
```
The `@classmethod` form is a function [decorator](_3_glossary.html.md#term-decorator) – see [Function definitions](_3_reference_compound_stmts.html.md#function) for details.

A class method can be called either on the class (such as `C.f()`) or on an instance (such as `C().f()`). The instance is ignored except for its class. If a class method is called for a derived class, the derived class object is passed as the implied first argument.

Class methods are different than C++ or Java static methods. If you want those, see [`staticmethod()`](_3_library_functions.html.md#staticmethod) in this section. For more information on class methods, see [The standard type hierarchy](_3_reference_datamodel.html.md#types).

Changed in version 3.9: Class methods can now wrap other [descriptors](_3_glossary.html.md#term-descriptor) such as [`property()`](_3_library_functions.html.md#property).

Changed in version 3.10: Class methods now inherit the method attributes (`__module__`, `__name__`, `__qualname__`, `__doc__` and `__annotations__`) and have a new `__wrapped__` attribute.

Changed in version 3.11: Class methods can no longer wrap other [descriptors](_3_glossary.html.md#term-descriptor) such as [`property()`](_3_library_functions.html.md#property).

compile(_source_, _filename_, _mode_, _flags\=0_, _dont\_inherit\=False_, _optimize\=\-1_)[¶](_3_library_functions.html.md#compile)

Compile the _source_ into a code or AST object. Code objects can be executed by [`exec()`](_3_library_functions.html.md#exec) or [`eval()`](_3_library_functions.html.md#eval). _source_ can either be a normal string, a byte string, or an AST object. Refer to the [`ast`](_3_library_ast.html.md#module-ast) module documentation for information on how to work with AST objects.

The _filename_ argument should give the file from which the code was read; pass some recognizable value if it wasn’t read from a file (`'<string>'` is commonly used).

The _mode_ argument specifies what kind of code must be compiled; it can be `'exec'` if _source_ consists of a sequence of statements, `'eval'` if it consists of a single expression, or `'single'` if it consists of a single interactive statement (in the latter case, expression statements that evaluate to something other than `None` will be printed).

The optional arguments _flags_ and _dont\_inherit_ control which [compiler options](_3_library_ast.html.md#ast-compiler-flags) should be activated and which [future features](_3_reference_simple_stmts.html.md#future) should be allowed. If neither is present (or both are zero) the code is compiled with the same flags that affect the code that is calling [`compile()`](_3_library_functions.html.md#compile). If the _flags_ argument is given and _dont\_inherit_ is not (or is zero) then the compiler options and the future statements specified by the _flags_ argument are used in addition to those that would be used anyway. If _dont\_inherit_ is a non-zero integer then the _flags_ argument is it – the flags (future features and compiler options) in the surrounding code are ignored.

Compiler options and future statements are specified by bits which can be bitwise ORed together to specify multiple options. The bitfield required to specify a given future feature can be found as the [`compiler_flag`](_3_library___future__.html.md#future__._Feature.compiler_flag) attribute on the [`_Feature`](_3_library___future__.html.md#future__._Feature) instance in the [`__future__`](_3_library___future__.html.md#module-__future__) module. [Compiler flags](_3_library_ast.html.md#ast-compiler-flags) can be found in [`ast`](_3_library_ast.html.md#module-ast) module, with `PyCF_` prefix.

The argument _optimize_ specifies the optimization level of the compiler; the default value of `-1` selects the optimization level of the interpreter as given by [`-O`](_3_using_cmdline.html.md#cmdoption-O) options. Explicit levels are `0` (no optimization; `__debug__` is true), `1` (asserts are removed, `__debug__` is false) or `2` (docstrings are removed too).

This function raises [`SyntaxError`](_3_library_exceptions.html.md#SyntaxError) if the compiled source is invalid, and [`ValueError`](_3_library_exceptions.html.md#ValueError) if the source contains null bytes.

If you want to parse Python code into its AST representation, see [`ast.parse()`](_3_library_ast.html.md#ast.parse).

Raises an [auditing event](_3_library_sys.html.md#auditing) `compile` with arguments `source` and `filename`. This event may also be raised by implicit compilation.

Note

When compiling a string with multi-line code in `'single'` or `'eval'` mode, input must be terminated by at least one newline character. This is to facilitate detection of incomplete and complete statements in the [`code`](_3_library_code.html.md#module-code) module.

Warning

It is possible to crash the Python interpreter with a sufficiently large/complex string when compiling to an AST object due to stack depth limitations in Python’s AST compiler.

Changed in version 3.2: Allowed use of Windows and Mac newlines. Also, input in `'exec'` mode does not have to end in a newline anymore. Added the _optimize_ parameter.

Changed in version 3.5: Previously, [`TypeError`](_3_library_exceptions.html.md#TypeError) was raised when null bytes were encountered in _source_.

New in version 3.8: `ast.PyCF_ALLOW_TOP_LEVEL_AWAIT` can now be passed in flags to enable support for top-level `await`, `async for`, and `async with`.

_class_ complex(_real\=0_, _imag\=0_)[¶](_3_library_functions.html.md#complex) _class_ complex(_string_)

Return a complex number with the value _real_ + _imag_\*1j or convert a string or number to a complex number. If the first parameter is a string, it will be interpreted as a complex number and the function must be called without a second parameter. The second parameter can never be a string. Each argument may be any numeric type (including complex). If _imag_ is omitted, it defaults to zero and the constructor serves as a numeric conversion like [`int`](_3_library_functions.html.md#int) and [`float`](_3_library_functions.html.md#float). If both arguments are omitted, returns `0j`.

For a general Python object `x`, `complex(x)` delegates to `x.__complex__()`. If [`__complex__()`](_3_reference_datamodel.html.md#object.__complex__) is not defined then it falls back to [`__float__()`](_3_reference_datamodel.html.md#object.__float__). If `__float__()` is not defined then it falls back to [`__index__()`](_3_reference_datamodel.html.md#object.__index__).

Note

When converting from a string, the string must not contain whitespace around the central `+` or `-` operator. For example, `complex('1+2j')` is fine, but `complex('1 + 2j')` raises [`ValueError`](_3_library_exceptions.html.md#ValueError).

The complex type is described in [Numeric Types — int, float, complex](_3_library_stdtypes.html.md#typesnumeric).

Changed in version 3.6: Grouping digits with underscores as in code literals is allowed.

delattr(_object_, _name_)[¶](_3_library_functions.html.md#delattr)

This is a relative of [`setattr()`](_3_library_functions.html.md#setattr). The arguments are an object and a string. The string must be the name of one of the object’s attributes. The function deletes the named attribute, provided the object allows it. For example, `delattr(x, 'foobar')` is equivalent to `del x.foobar`. _name_ need not be a Python identifier (see [`setattr()`](_3_library_functions.html.md#setattr)).

_class_ dict(_\*\*kwarg_) _class_ dict(_mapping_, _\*\*kwarg_) _class_ dict(_iterable_, _\*\*kwarg_)

Create a new dictionary. The [`dict`](_3_library_stdtypes.html.md#dict) object is the dictionary class. See [`dict`](_3_library_stdtypes.html.md#dict) and [Mapping Types — dict](_3_library_stdtypes.html.md#typesmapping) for documentation about this class.

For other containers see the built-in [`list`](_3_library_stdtypes.html.md#list), [`set`](_3_library_stdtypes.html.md#set), and [`tuple`](_3_library_stdtypes.html.md#tuple) classes, as well as the [`collections`](_3_library_collections.html.md#module-collections) module.

dir()[¶](_3_library_functions.html.md#dir) dir(_object_)

Without arguments, return the list of names in the current local scope. With an argument, attempt to return a list of valid attributes for that object.

If the object has a method named [`__dir__()`](_3_reference_datamodel.html.md#object.__dir__), this method will be called and must return the list of attributes. This allows objects that implement a custom [`__getattr__()`](_3_reference_datamodel.html.md#object.__getattr__) or [`__getattribute__()`](_3_reference_datamodel.html.md#object.__getattribute__) function to customize the way [`dir()`](_3_library_functions.html.md#dir) reports their attributes.

If the object does not provide [`__dir__()`](_3_reference_datamodel.html.md#object.__dir__), the function tries its best to gather information from the object’s [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute, if defined, and from its type object. The resulting list is not necessarily complete and may be inaccurate when the object has a custom [`__getattr__()`](_3_reference_datamodel.html.md#object.__getattr__).

The default [`dir()`](_3_library_functions.html.md#dir) mechanism behaves differently with different types of objects, as it attempts to produce the most relevant, rather than complete, information:

*   If the object is a module object, the list contains the names of the module’s attributes.
    
*   If the object is a type or class object, the list contains the names of its attributes, and recursively of the attributes of its bases.
    
*   Otherwise, the list contains the object’s attributes’ names, the names of its class’s attributes, and recursively of the attributes of its class’s base classes.
    

The resulting list is sorted alphabetically. For example:
```
\>>> import struct
\>>> dir()   \# show the names in the module namespace  

\['\_\_builtins\_\_', '\_\_name\_\_', 'struct'\]
\>>> dir(struct)   \# show the names in the struct module 

\['Struct', '\_\_all\_\_', '\_\_builtins\_\_', '\_\_cached\_\_', '\_\_doc\_\_', '\_\_file\_\_',
 '\_\_initializing\_\_', '\_\_loader\_\_', '\_\_name\_\_', '\_\_package\_\_',
 '\_clearcache', 'calcsize', 'error', 'pack', 'pack\_into',
 'unpack', 'unpack\_from'\]
\>>> class Shape:
...     def \_\_dir\_\_(self):
...         return \['area', 'perimeter', 'location'\]
\>>> s \= Shape()
\>>> dir(s)
\['area', 'location', 'perimeter'\]
```
Note

Because [`dir()`](_3_library_functions.html.md#dir) is supplied primarily as a convenience for use at an interactive prompt, it tries to supply an interesting set of names more than it tries to supply a rigorously or consistently defined set of names, and its detailed behavior may change across releases. For example, metaclass attributes are not in the result list when the argument is a class.

divmod(_a_, _b_)[¶](_3_library_functions.html.md#divmod)

Take two (non-complex) numbers as arguments and return a pair of numbers consisting of their quotient and remainder when using integer division. With mixed operand types, the rules for binary arithmetic operators apply. For integers, the result is the same as `(a // b, a % b)`. For floating point numbers the result is `(q, a % b)`, where _q_ is usually `math.floor(a / b)` but may be 1 less than that. In any case `q * b + a % b` is very close to _a_, if `a % b` is non-zero it has the same sign as _b_, and `0 <= abs(a % b) < abs(b)`.

enumerate(_iterable_, _start\=0_)[¶](_3_library_functions.html.md#enumerate)

Return an enumerate object. _iterable_ must be a sequence, an [iterator](_3_glossary.html.md#term-iterator), or some other object which supports iteration. The [`__next__()`](_3_library_stdtypes.html.md#iterator.__next__) method of the iterator returned by [`enumerate()`](_3_library_functions.html.md#enumerate) returns a tuple containing a count (from _start_ which defaults to 0) and the values obtained from iterating over _iterable_.
```
\>>> seasons \= \['Spring', 'Summer', 'Fall', 'Winter'\]
\>>> list(enumerate(seasons))
\[(0, 'Spring'), (1, 'Summer'), (2, 'Fall'), (3, 'Winter')\]
\>>> list(enumerate(seasons, start\=1))
\[(1, 'Spring'), (2, 'Summer'), (3, 'Fall'), (4, 'Winter')\]
```
Equivalent to:
```
def enumerate(iterable, start\=0):
    n \= start
    for elem in iterable:
        yield n, elem
        n += 1
```
eval(_expression_, _globals\=None_, _locals\=None_)[¶](_3_library_functions.html.md#eval)

The arguments are a string and optional globals and locals. If provided, _globals_ must be a dictionary. If provided, _locals_ can be any mapping object.

The _expression_ argument is parsed and evaluated as a Python expression (technically speaking, a condition list) using the _globals_ and _locals_ dictionaries as global and local namespace. If the _globals_ dictionary is present and does not contain a value for the key `__builtins__`, a reference to the dictionary of the built-in module [`builtins`](_3_library_builtins.html.md#module-builtins) is inserted under that key before _expression_ is parsed. That way you can control what builtins are available to the executed code by inserting your own `__builtins__` dictionary into _globals_ before passing it to [`eval()`](_3_library_functions.html.md#eval). If the _locals_ dictionary is omitted it defaults to the _globals_ dictionary. If both dictionaries are omitted, the expression is executed with the _globals_ and _locals_ in the environment where [`eval()`](_3_library_functions.html.md#eval) is called. Note, _eval()_ does not have access to the [nested scopes](_3_glossary.html.md#term-nested-scope) (non-locals) in the enclosing environment.

The return value is the result of the evaluated expression. Syntax errors are reported as exceptions. Example:
```
\>>> x \= 1
\>>> eval('x+1')
2
```
This function can also be used to execute arbitrary code objects (such as those created by [`compile()`](_3_library_functions.html.md#compile)). In this case, pass a code object instead of a string. If the code object has been compiled with `'exec'` as the _mode_ argument, [`eval()`](_3_library_functions.html.md#eval)'s return value will be `None`.

Hints: dynamic execution of statements is supported by the [`exec()`](_3_library_functions.html.md#exec) function. The [`globals()`](_3_library_functions.html.md#globals) and [`locals()`](_3_library_functions.html.md#locals) functions return the current global and local dictionary, respectively, which may be useful to pass around for use by [`eval()`](_3_library_functions.html.md#eval) or [`exec()`](_3_library_functions.html.md#exec).

If the given source is a string, then leading and trailing spaces and tabs are stripped.

See [`ast.literal_eval()`](_3_library_ast.html.md#ast.literal_eval) for a function that can safely evaluate strings with expressions containing only literals.

Raises an [auditing event](_3_library_sys.html.md#auditing) `exec` with the code object as the argument. Code compilation events may also be raised.

exec(_object_, _globals\=None_, _locals\=None_, _/_, _\*_, _closure\=None_)[¶](_3_library_functions.html.md#exec)

This function supports dynamic execution of Python code. _object_ must be either a string or a code object. If it is a string, the string is parsed as a suite of Python statements which is then executed (unless a syntax error occurs). [\[1\]](_3_library_functions.html.md#id2) If it is a code object, it is simply executed. In all cases, the code that’s executed is expected to be valid as file input (see the section [File input](_3_reference_toplevel_components.html.md#file-input) in the Reference Manual). Be aware that the [`nonlocal`](_3_reference_simple_stmts.html.md#nonlocal), [`yield`](_3_reference_simple_stmts.html.md#yield), and [`return`](_3_reference_simple_stmts.html.md#return) statements may not be used outside of function definitions even within the context of code passed to the [`exec()`](_3_library_functions.html.md#exec) function. The return value is `None`.

In all cases, if the optional parts are omitted, the code is executed in the current scope. If only _globals_ is provided, it must be a dictionary (and not a subclass of dictionary), which will be used for both the global and the local variables. If _globals_ and _locals_ are given, they are used for the global and local variables, respectively. If provided, _locals_ can be any mapping object. Remember that at the module level, globals and locals are the same dictionary. If exec gets two separate objects as _globals_ and _locals_, the code will be executed as if it were embedded in a class definition.

If the _globals_ dictionary does not contain a value for the key `__builtins__`, a reference to the dictionary of the built-in module [`builtins`](_3_library_builtins.html.md#module-builtins) is inserted under that key. That way you can control what builtins are available to the executed code by inserting your own `__builtins__` dictionary into _globals_ before passing it to [`exec()`](_3_library_functions.html.md#exec).

The _closure_ argument specifies a closure–a tuple of cellvars. It’s only valid when the _object_ is a code object containing free variables. The length of the tuple must exactly match the number of free variables referenced by the code object.

Raises an [auditing event](_3_library_sys.html.md#auditing) `exec` with the code object as the argument. Code compilation events may also be raised.

Note

The built-in functions [`globals()`](_3_library_functions.html.md#globals) and [`locals()`](_3_library_functions.html.md#locals) return the current global and local dictionary, respectively, which may be useful to pass around for use as the second and third argument to [`exec()`](_3_library_functions.html.md#exec).

Note

The default _locals_ act as described for function [`locals()`](_3_library_functions.html.md#locals) below: modifications to the default _locals_ dictionary should not be attempted. Pass an explicit _locals_ dictionary if you need to see effects of the code on _locals_ after function [`exec()`](_3_library_functions.html.md#exec) returns.

Changed in version 3.11: Added the _closure_ parameter.

filter(_function_, _iterable_)[¶](_3_library_functions.html.md#filter)

Construct an iterator from those elements of _iterable_ for which _function_ is true. _iterable_ may be either a sequence, a container which supports iteration, or an iterator. If _function_ is `None`, the identity function is assumed, that is, all elements of _iterable_ that are false are removed.

Note that `filter(function, iterable)` is equivalent to the generator expression `(item for item in iterable if function(item))` if function is not `None` and `(item for item in iterable if item)` if function is `None`.

See [`itertools.filterfalse()`](_3_library_itertools.html.md#itertools.filterfalse) for the complementary function that returns elements of _iterable_ for which _function_ is false.

_class_ float(_x\=0.0_)[¶](_3_library_functions.html.md#float)

Return a floating point number constructed from a number or string _x_.

If the argument is a string, it should contain a decimal number, optionally preceded by a sign, and optionally embedded in whitespace. The optional sign may be `'+'` or `'-'`; a `'+'` sign has no effect on the value produced. The argument may also be a string representing a NaN (not-a-number), or positive or negative infinity. More precisely, the input must conform to the `floatvalue` production rule in the following grammar, after leading and trailing whitespace characters are removed:
```
**sign       ** ::=  "+" | "-"
**infinity   ** ::=  "Infinity" | "inf"
**nan        ** ::=  "nan"
**digit      ** ::=  <a Unicode decimal digit, i.e. characters in Unicode general category Nd>
**digitpart  ** ::=  [`digit`](_3_library_functions.html.md#grammar-token-float-digit) (\["\_"\] [`digit`](_3_library_functions.html.md#grammar-token-float-digit))\**number     ** ::=  \[[`digitpart`](_3_library_functions.html.md#grammar-token-float-digitpart)\] "." [`digitpart`](_3_library_functions.html.md#grammar-token-float-digitpart) | [`digitpart`](_3_library_functions.html.md#grammar-token-float-digitpart) \["."\]
**exponent   ** ::=  ("e" | "E") \["+" | "-"\] [`digitpart`](_3_library_functions.html.md#grammar-token-float-digitpart)
**floatnumber** ::=  number \[[`exponent`](_3_library_functions.html.md#grammar-token-float-exponent)\]
**floatvalue ** ::=  \[[`sign`](_3_library_functions.html.md#grammar-token-float-sign)\] ([`floatnumber`](_3_library_functions.html.md#grammar-token-float-floatnumber) | [`infinity`](_3_library_functions.html.md#grammar-token-float-infinity) | [`nan`](_3_library_functions.html.md#grammar-token-float-nan))
```
Case is not significant, so, for example, “inf”, “Inf”, “INFINITY”, and “iNfINity” are all acceptable spellings for positive infinity.

Otherwise, if the argument is an integer or a floating point number, a floating point number with the same value (within Python’s floating point precision) is returned. If the argument is outside the range of a Python float, an [`OverflowError`](_3_library_exceptions.html.md#OverflowError) will be raised.

For a general Python object `x`, `float(x)` delegates to `x.__float__()`. If [`__float__()`](_3_reference_datamodel.html.md#object.__float__) is not defined then it falls back to [`__index__()`](_3_reference_datamodel.html.md#object.__index__).

If no argument is given, `0.0` is returned.

Examples:
```
\>>> float('+1.23')
1.23
\>>> float('   -12345\\n')
\-12345.0
\>>> float('1e-003')
0.001
\>>> float('+1E6')
1000000.0
\>>> float('-Infinity')
\-inf
```
The float type is described in [Numeric Types — int, float, complex](_3_library_stdtypes.html.md#typesnumeric).

Changed in version 3.6: Grouping digits with underscores as in code literals is allowed.

Changed in version 3.7: _x_ is now a positional-only parameter.

format(_value_, _format\_spec\=''_)[¶](_3_library_functions.html.md#format)

Convert a _value_ to a “formatted” representation, as controlled by _format\_spec_. The interpretation of _format\_spec_ will depend on the type of the _value_ argument; however, there is a standard formatting syntax that is used by most built-in types: [Format Specification Mini-Language](_3_library_string.html.md#formatspec).

The default _format\_spec_ is an empty string which usually gives the same effect as calling [`str(value)`](_3_library_stdtypes.html.md#str).

A call to `format(value, format_spec)` is translated to `type(value).__format__(value, format_spec)` which bypasses the instance dictionary when searching for the value’s [`__format__()`](_3_reference_datamodel.html.md#object.__format__) method. A [`TypeError`](_3_library_exceptions.html.md#TypeError) exception is raised if the method search reaches [`object`](_3_library_functions.html.md#object) and the _format\_spec_ is non-empty, or if either the _format\_spec_ or the return value are not strings.

Changed in version 3.4: `object().__format__(format_spec)` raises [`TypeError`](_3_library_exceptions.html.md#TypeError) if _format\_spec_ is not an empty string.

_class_ frozenset(_iterable\=set()_)

Return a new [`frozenset`](_3_library_stdtypes.html.md#frozenset) object, optionally with elements taken from _iterable_. `frozenset` is a built-in class. See [`frozenset`](_3_library_stdtypes.html.md#frozenset) and [Set Types — set, frozenset](_3_library_stdtypes.html.md#types-set) for documentation about this class.

For other containers see the built-in [`set`](_3_library_stdtypes.html.md#set), [`list`](_3_library_stdtypes.html.md#list), [`tuple`](_3_library_stdtypes.html.md#tuple), and [`dict`](_3_library_stdtypes.html.md#dict) classes, as well as the [`collections`](_3_library_collections.html.md#module-collections) module.

getattr(_object_, _name_)[¶](_3_library_functions.html.md#getattr) getattr(_object_, _name_, _default_)

Return the value of the named attribute of _object_. _name_ must be a string. If the string is the name of one of the object’s attributes, the result is the value of that attribute. For example, `getattr(x, 'foobar')` is equivalent to `x.foobar`. If the named attribute does not exist, _default_ is returned if provided, otherwise [`AttributeError`](_3_library_exceptions.html.md#AttributeError) is raised. _name_ need not be a Python identifier (see [`setattr()`](_3_library_functions.html.md#setattr)).

Note

Since [private name mangling](_3_reference_expressions.html.md#private-name-mangling) happens at compilation time, one must manually mangle a private attribute’s (attributes with two leading underscores) name in order to retrieve it with [`getattr()`](_3_library_functions.html.md#getattr).

globals()[¶](_3_library_functions.html.md#globals)

Return the dictionary implementing the current module namespace. For code within functions, this is set when the function is defined and remains the same regardless of where the function is called.

hasattr(_object_, _name_)[¶](_3_library_functions.html.md#hasattr)

The arguments are an object and a string. The result is `True` if the string is the name of one of the object’s attributes, `False` if not. (This is implemented by calling `getattr(object, name)` and seeing whether it raises an [`AttributeError`](_3_library_exceptions.html.md#AttributeError) or not.)

hash(_object_)[¶](_3_library_functions.html.md#hash)

Return the hash value of the object (if it has one). Hash values are integers. They are used to quickly compare dictionary keys during a dictionary lookup. Numeric values that compare equal have the same hash value (even if they are of different types, as is the case for 1 and 1.0).

Note

For objects with custom [`__hash__()`](_3_reference_datamodel.html.md#object.__hash__) methods, note that [`hash()`](_3_library_functions.html.md#hash) truncates the return value based on the bit width of the host machine.

help()[¶](_3_library_functions.html.md#help) help(_request_)

Invoke the built-in help system. (This function is intended for interactive use.) If no argument is given, the interactive help system starts on the interpreter console. If the argument is a string, then the string is looked up as the name of a module, function, class, method, keyword, or documentation topic, and a help page is printed on the console. If the argument is any other kind of object, a help page on the object is generated.

Note that if a slash(/) appears in the parameter list of a function when invoking [`help()`](_3_library_functions.html.md#help), it means that the parameters prior to the slash are positional-only. For more info, see [the FAQ entry on positional-only parameters](_3_faq_programming.html.md#faq-positional-only-arguments).

This function is added to the built-in namespace by the [`site`](_3_library_site.html.md#module-site) module.

Changed in version 3.4: Changes to [`pydoc`](_3_library_pydoc.html.md#module-pydoc) and [`inspect`](_3_library_inspect.html.md#module-inspect) mean that the reported signatures for callables are now more comprehensive and consistent.

hex(_x_)[¶](_3_library_functions.html.md#hex)

Convert an integer number to a lowercase hexadecimal string prefixed with “0x”. If _x_ is not a Python [`int`](_3_library_functions.html.md#int) object, it has to define an [`__index__()`](_3_reference_datamodel.html.md#object.__index__) method that returns an integer. Some examples:
```
\>>> hex(255)
'0xff'
\>>> hex(\-42)
'-0x2a'
```
If you want to convert an integer number to an uppercase or lower hexadecimal string with prefix or not, you can use either of the following ways:
```
\>>> '%#x' % 255, '%x' % 255, '%X' % 255
('0xff', 'ff', 'FF')
\>>> format(255, '#x'), format(255, 'x'), format(255, 'X')
('0xff', 'ff', 'FF')
\>>> f'{255:#x}', f'{255:x}', f'{255:X}'
('0xff', 'ff', 'FF')
```
See also [`format()`](_3_library_functions.html.md#format) for more information.

See also [`int()`](_3_library_functions.html.md#int) for converting a hexadecimal string to an integer using a base of 16.

Note

To obtain a hexadecimal string representation for a float, use the [`float.hex()`](_3_library_stdtypes.html.md#float.hex) method.

id(_object_)[¶](_3_library_functions.html.md#id)

Return the “identity” of an object. This is an integer which is guaranteed to be unique and constant for this object during its lifetime. Two objects with non-overlapping lifetimes may have the same [`id()`](_3_library_functions.html.md#id) value.

**CPython implementation detail:** This is the address of the object in memory.

Raises an [auditing event](_3_library_sys.html.md#auditing) `builtins.id` with argument `id`.

input()[¶](_3_library_functions.html.md#input) input(_prompt_)

If the _prompt_ argument is present, it is written to standard output without a trailing newline. The function then reads a line from input, converts it to a string (stripping a trailing newline), and returns that. When EOF is read, [`EOFError`](_3_library_exceptions.html.md#EOFError) is raised. Example:
```
\>>> s \= input('--> ')  
\--> Monty Python's Flying Circus
\>>> s  
"Monty Python's Flying Circus"
```
If the [`readline`](_3_library_readline.html.md#module-readline) module was loaded, then [`input()`](_3_library_functions.html.md#input) will use it to provide elaborate line editing and history features.

Raises an [auditing event](_3_library_sys.html.md#auditing) `builtins.input` with argument `prompt` before reading input

Raises an [auditing event](_3_library_sys.html.md#auditing) `builtins.input/result` with the result after successfully reading input.

_class_ int(_x\=0_)[¶](_3_library_functions.html.md#int) _class_ int(_x_, _base\=10_)

Return an integer object constructed from a number or string _x_, or return `0` if no arguments are given. If _x_ defines [`__int__()`](_3_reference_datamodel.html.md#object.__int__), `int(x)` returns `x.__int__()`. If _x_ defines [`__index__()`](_3_reference_datamodel.html.md#object.__index__), it returns `x.__index__()`. If _x_ defines [`__trunc__()`](_3_reference_datamodel.html.md#object.__trunc__), it returns `x.__trunc__()`. For floating point numbers, this truncates towards zero.

If _x_ is not a number or if _base_ is given, then _x_ must be a string, [`bytes`](_3_library_stdtypes.html.md#bytes), or [`bytearray`](_3_library_stdtypes.html.md#bytearray) instance representing an integer in radix _base_. Optionally, the string can be preceded by `+` or `-` (with no space in between), have leading zeros, be surrounded by whitespace, and have single underscores interspersed between digits.

A base-n integer string contains digits, each representing a value from 0 to n-1. The values 0–9 can be represented by any Unicode decimal digit. The values 10–35 can be represented by `a` to `z` (or `A` to `Z`). The default _base_ is 10. The allowed bases are 0 and 2–36. Base-2, -8, and -16 strings can be optionally prefixed with `0b`/`0B`, `0o`/`0O`, or `0x`/`0X`, as with integer literals in code. For base 0, the string is interpreted in a similar way to an [integer literal in code](_3_reference_lexical_analysis.html.md#integers), in that the actual base is 2, 8, 10, or 16 as determined by the prefix. Base 0 also disallows leading zeros: `int('010', 0)` is not legal, while `int('010')` and `int('010', 8)` are.

The integer type is described in [Numeric Types — int, float, complex](_3_library_stdtypes.html.md#typesnumeric).

Changed in version 3.4: If _base_ is not an instance of [`int`](_3_library_functions.html.md#int) and the _base_ object has a [`base.__index__`](_3_reference_datamodel.html.md#object.__index__) method, that method is called to obtain an integer for the base. Previous versions used [`base.__int__`](_3_reference_datamodel.html.md#object.__int__) instead of [`base.__index__`](_3_reference_datamodel.html.md#object.__index__).

Changed in version 3.6: Grouping digits with underscores as in code literals is allowed.

Changed in version 3.7: _x_ is now a positional-only parameter.

Changed in version 3.11: The delegation to [`__trunc__()`](_3_reference_datamodel.html.md#object.__trunc__) is deprecated.

Changed in version 3.11: [`int`](_3_library_functions.html.md#int) string inputs and string representations can be limited to help avoid denial of service attacks. A [`ValueError`](_3_library_exceptions.html.md#ValueError) is raised when the limit is exceeded while converting a string _x_ to an [`int`](_3_library_functions.html.md#int) or when converting an [`int`](_3_library_functions.html.md#int) into a string would exceed the limit. See the [integer string conversion length limitation](_3_library_stdtypes.html.md#int-max-str-digits) documentation.

isinstance(_object_, _classinfo_)[¶](_3_library_functions.html.md#isinstance)

Return `True` if the _object_ argument is an instance of the _classinfo_ argument, or of a (direct, indirect, or [virtual](_3_glossary.html.md#term-abstract-base-class)) subclass thereof. If _object_ is not an object of the given type, the function always returns `False`. If _classinfo_ is a tuple of type objects (or recursively, other such tuples) or a [Union Type](_3_library_stdtypes.html.md#types-union) of multiple types, return `True` if _object_ is an instance of any of the types. If _classinfo_ is not a type or tuple of types and such tuples, a [`TypeError`](_3_library_exceptions.html.md#TypeError) exception is raised. [`TypeError`](_3_library_exceptions.html.md#TypeError) may not be raised for an invalid type if an earlier check succeeds.

Changed in version 3.10: _classinfo_ can be a [Union Type](_3_library_stdtypes.html.md#types-union).

issubclass(_class_, _classinfo_)[¶](_3_library_functions.html.md#issubclass)

Return `True` if _class_ is a subclass (direct, indirect, or [virtual](_3_glossary.html.md#term-abstract-base-class)) of _classinfo_. A class is considered a subclass of itself. _classinfo_ may be a tuple of class objects (or recursively, other such tuples) or a [Union Type](_3_library_stdtypes.html.md#types-union), in which case return `True` if _class_ is a subclass of any entry in _classinfo_. In any other case, a [`TypeError`](_3_library_exceptions.html.md#TypeError) exception is raised.

Changed in version 3.10: _classinfo_ can be a [Union Type](_3_library_stdtypes.html.md#types-union).

iter(_object_)[¶](_3_library_functions.html.md#iter) iter(_object_, _sentinel_)

Return an [iterator](_3_glossary.html.md#term-iterator) object. The first argument is interpreted very differently depending on the presence of the second argument. Without a second argument, _object_ must be a collection object which supports the [iterable](_3_glossary.html.md#term-iterable) protocol (the [`__iter__()`](_3_reference_datamodel.html.md#object.__iter__) method), or it must support the sequence protocol (the [`__getitem__()`](_3_reference_datamodel.html.md#object.__getitem__) method with integer arguments starting at `0`). If it does not support either of those protocols, [`TypeError`](_3_library_exceptions.html.md#TypeError) is raised. If the second argument, _sentinel_, is given, then _object_ must be a callable object. The iterator created in this case will call _object_ with no arguments for each call to its [`__next__()`](_3_library_stdtypes.html.md#iterator.__next__) method; if the value returned is equal to _sentinel_, [`StopIteration`](_3_library_exceptions.html.md#StopIteration) will be raised, otherwise the value will be returned.

See also [Iterator Types](_3_library_stdtypes.html.md#typeiter).

One useful application of the second form of [`iter()`](_3_library_functions.html.md#iter) is to build a block-reader. For example, reading fixed-width blocks from a binary database file until the end of file is reached:
```
from functools import partial
with open('mydata.db', 'rb') as f:
    for block in iter(partial(f.read, 64), b''):
        process\_block(block)
```
len(_s_)[¶](_3_library_functions.html.md#len)

Return the length (the number of items) of an object. The argument may be a sequence (such as a string, bytes, tuple, list, or range) or a collection (such as a dictionary, set, or frozen set).

_class_ list _class_ list(_iterable_)

Rather than being a function, [`list`](_3_library_stdtypes.html.md#list) is actually a mutable sequence type, as documented in [Lists](_3_library_stdtypes.html.md#typesseq-list) and [Sequence Types — list, tuple, range](_3_library_stdtypes.html.md#typesseq).

locals()[¶](_3_library_functions.html.md#locals)

Update and return a dictionary representing the current local symbol table. Free variables are returned by [`locals()`](_3_library_functions.html.md#locals) when it is called in function blocks, but not in class blocks. Note that at the module level, [`locals()`](_3_library_functions.html.md#locals) and [`globals()`](_3_library_functions.html.md#globals) are the same dictionary.

Note

The contents of this dictionary should not be modified; changes may not affect the values of local and free variables used by the interpreter.

map(_function_, _iterable_, _\*iterables_)[¶](_3_library_functions.html.md#map)

Return an iterator that applies _function_ to every item of _iterable_, yielding the results. If additional _iterables_ arguments are passed, _function_ must take that many arguments and is applied to the items from all iterables in parallel. With multiple iterables, the iterator stops when the shortest iterable is exhausted. For cases where the function inputs are already arranged into argument tuples, see [`itertools.starmap()`](_3_library_itertools.html.md#itertools.starmap).

max(_iterable_, _\*_, _key\=None_)[¶](_3_library_functions.html.md#max) max(_iterable_, _\*_, _default_, _key\=None_) max(_arg1_, _arg2_, _\*args_, _key\=None_)

Return the largest item in an iterable or the largest of two or more arguments.

If one positional argument is provided, it should be an [iterable](_3_glossary.html.md#term-iterable). The largest item in the iterable is returned. If two or more positional arguments are provided, the largest of the positional arguments is returned.

There are two optional keyword-only arguments. The _key_ argument specifies a one-argument ordering function like that used for [`list.sort()`](_3_library_stdtypes.html.md#list.sort). The _default_ argument specifies an object to return if the provided iterable is empty. If the iterable is empty and _default_ is not provided, a [`ValueError`](_3_library_exceptions.html.md#ValueError) is raised.

If multiple items are maximal, the function returns the first one encountered. This is consistent with other sort-stability preserving tools such as `sorted(iterable, key=keyfunc, reverse=True)[0]` and `heapq.nlargest(1, iterable, key=keyfunc)`.

Changed in version 3.4: Added the _default_ keyword-only parameter.

Changed in version 3.8: The _key_ can be `None`.

_class_ memoryview(_object_)

Return a “memory view” object created from the given argument. See [Memory Views](_3_library_stdtypes.html.md#typememoryview) for more information.

min(_iterable_, _\*_, _key\=None_)[¶](_3_library_functions.html.md#min) min(_iterable_, _\*_, _default_, _key\=None_) min(_arg1_, _arg2_, _\*args_, _key\=None_)

Return the smallest item in an iterable or the smallest of two or more arguments.

If one positional argument is provided, it should be an [iterable](_3_glossary.html.md#term-iterable). The smallest item in the iterable is returned. If two or more positional arguments are provided, the smallest of the positional arguments is returned.

There are two optional keyword-only arguments. The _key_ argument specifies a one-argument ordering function like that used for [`list.sort()`](_3_library_stdtypes.html.md#list.sort). The _default_ argument specifies an object to return if the provided iterable is empty. If the iterable is empty and _default_ is not provided, a [`ValueError`](_3_library_exceptions.html.md#ValueError) is raised.

If multiple items are minimal, the function returns the first one encountered. This is consistent with other sort-stability preserving tools such as `sorted(iterable, key=keyfunc)[0]` and `heapq.nsmallest(1, iterable, key=keyfunc)`.

Changed in version 3.4: Added the _default_ keyword-only parameter.

Changed in version 3.8: The _key_ can be `None`.

next(_iterator_)[¶](_3_library_functions.html.md#next) next(_iterator_, _default_)

Retrieve the next item from the [iterator](_3_glossary.html.md#term-iterator) by calling its [`__next__()`](_3_library_stdtypes.html.md#iterator.__next__) method. If _default_ is given, it is returned if the iterator is exhausted, otherwise [`StopIteration`](_3_library_exceptions.html.md#StopIteration) is raised.

_class_ object[¶](_3_library_functions.html.md#object)

Return a new featureless object. [`object`](_3_library_functions.html.md#object) is a base for all classes. It has methods that are common to all instances of Python classes. This function does not accept any arguments.

Note

[`object`](_3_library_functions.html.md#object) does _not_ have a [`__dict__`](_3_library_stdtypes.html.md#object.__dict__), so you can’t assign arbitrary attributes to an instance of the [`object`](_3_library_functions.html.md#object) class.

oct(_x_)[¶](_3_library_functions.html.md#oct)

Convert an integer number to an octal string prefixed with “0o”. The result is a valid Python expression. If _x_ is not a Python [`int`](_3_library_functions.html.md#int) object, it has to define an [`__index__()`](_3_reference_datamodel.html.md#object.__index__) method that returns an integer. For example:
```
\>>> oct(8)
'0o10'
\>>> oct(\-56)
'-0o70'
```
If you want to convert an integer number to an octal string either with the prefix “0o” or not, you can use either of the following ways.
```
\>>> '%#o' % 10, '%o' % 10
('0o12', '12')
\>>> format(10, '#o'), format(10, 'o')
('0o12', '12')
\>>> f'{10:#o}', f'{10:o}'
('0o12', '12')
```
See also [`format()`](_3_library_functions.html.md#format) for more information.

open(_file_, _mode\='r'_, _buffering\=\-1_, _encoding\=None_, _errors\=None_, _newline\=None_, _closefd\=True_, _opener\=None_)[¶](_3_library_functions.html.md#open)

Open _file_ and return a corresponding [file object](_3_glossary.html.md#term-file-object). If the file cannot be opened, an [`OSError`](_3_library_exceptions.html.md#OSError) is raised. See [Reading and Writing Files](_3_tutorial_inputoutput.html.md#tut-files) for more examples of how to use this function.

_file_ is a [path-like object](_3_glossary.html.md#term-path-like-object) giving the pathname (absolute or relative to the current working directory) of the file to be opened or an integer file descriptor of the file to be wrapped. (If a file descriptor is given, it is closed when the returned I/O object is closed unless _closefd_ is set to `False`.)

_mode_ is an optional string that specifies the mode in which the file is opened. It defaults to `'r'` which means open for reading in text mode. Other common values are `'w'` for writing (truncating the file if it already exists), `'x'` for exclusive creation, and `'a'` for appending (which on _some_ Unix systems, means that _all_ writes append to the end of the file regardless of the current seek position). In text mode, if _encoding_ is not specified the encoding used is platform-dependent: [`locale.getencoding()`](_3_library_locale.html.md#locale.getencoding) is called to get the current locale encoding. (For reading and writing raw bytes use binary mode and leave _encoding_ unspecified.) The available modes are:

Character

Meaning

`'r'`

open for reading (default)

`'w'`

open for writing, truncating the file first

`'x'`

open for exclusive creation, failing if the file already exists

`'a'`

open for writing, appending to the end of file if it exists

`'b'`

binary mode

`'t'`

text mode (default)

`'+'`

open for updating (reading and writing)

The default mode is `'r'` (open for reading text, a synonym of `'rt'`). Modes `'w+'` and `'w+b'` open and truncate the file. Modes `'r+'` and `'r+b'` open the file with no truncation.

As mentioned in the [Overview](_3_library_io.html.md#io-overview), Python distinguishes between binary and text I/O. Files opened in binary mode (including `'b'` in the _mode_ argument) return contents as [`bytes`](_3_library_stdtypes.html.md#bytes) objects without any decoding. In text mode (the default, or when `'t'` is included in the _mode_ argument), the contents of the file are returned as [`str`](_3_library_stdtypes.html.md#str), the bytes having been first decoded using a platform-dependent encoding or using the specified _encoding_ if given.

Note

Python doesn’t depend on the underlying operating system’s notion of text files; all the processing is done by Python itself, and is therefore platform-independent.

_buffering_ is an optional integer used to set the buffering policy. Pass 0 to switch buffering off (only allowed in binary mode), 1 to select line buffering (only usable when writing in text mode), and an integer > 1 to indicate the size in bytes of a fixed-size chunk buffer. Note that specifying a buffer size this way applies for binary buffered I/O, but `TextIOWrapper` (i.e., files opened with `mode='r+'`) would have another buffering. To disable buffering in `TextIOWrapper`, consider using the `write_through` flag for [`io.TextIOWrapper.reconfigure()`](_3_library_io.html.md#io.TextIOWrapper.reconfigure). When no _buffering_ argument is given, the default buffering policy works as follows:

*   Binary files are buffered in fixed-size chunks; the size of the buffer is chosen using a heuristic trying to determine the underlying device’s “block size” and falling back on [`io.DEFAULT_BUFFER_SIZE`](_3_library_io.html.md#io.DEFAULT_BUFFER_SIZE). On many systems, the buffer will typically be 4096 or 8192 bytes long.
    
*   “Interactive” text files (files for which [`isatty()`](_3_library_io.html.md#io.IOBase.isatty) returns `True`) use line buffering. Other text files use the policy described above for binary files.
    

_encoding_ is the name of the encoding used to decode or encode the file. This should only be used in text mode. The default encoding is platform dependent (whatever [`locale.getencoding()`](_3_library_locale.html.md#locale.getencoding) returns), but any [text encoding](_3_glossary.html.md#term-text-encoding) supported by Python can be used. See the [`codecs`](_3_library_codecs.html.md#module-codecs) module for the list of supported encodings.

_errors_ is an optional string that specifies how encoding and decoding errors are to be handled—this cannot be used in binary mode. A variety of standard error handlers are available (listed under [Error Handlers](_3_library_codecs.html.md#error-handlers)), though any error handling name that has been registered with [`codecs.register_error()`](_3_library_codecs.html.md#codecs.register_error) is also valid. The standard names include:

*   `'strict'` to raise a [`ValueError`](_3_library_exceptions.html.md#ValueError) exception if there is an encoding error. The default value of `None` has the same effect.
    
*   `'ignore'` ignores errors. Note that ignoring encoding errors can lead to data loss.
    
*   `'replace'` causes a replacement marker (such as `'?'`) to be inserted where there is malformed data.
    
*   `'surrogateescape'` will represent any incorrect bytes as low surrogate code units ranging from U+DC80 to U+DCFF. These surrogate code units will then be turned back into the same bytes when the `surrogateescape` error handler is used when writing data. This is useful for processing files in an unknown encoding.
    
*   `'xmlcharrefreplace'` is only supported when writing to a file. Characters not supported by the encoding are replaced with the appropriate XML character reference `&#_nnn_;`.
    
*   `'backslashreplace'` replaces malformed data by Python’s backslashed escape sequences.
    
*   `'namereplace'` (also only supported when writing) replaces unsupported characters with `\N{...}` escape sequences.
    

_newline_ determines how to parse newline characters from the stream. It can be `None`, `''`, `'\n'`, `'\r'`, and `'\r\n'`. It works as follows:

*   When reading input from the stream, if _newline_ is `None`, universal newlines mode is enabled. Lines in the input can end in `'\n'`, `'\r'`, or `'\r\n'`, and these are translated into `'\n'` before being returned to the caller. If it is `''`, universal newlines mode is enabled, but line endings are returned to the caller untranslated. If it has any of the other legal values, input lines are only terminated by the given string, and the line ending is returned to the caller untranslated.
    
*   When writing output to the stream, if _newline_ is `None`, any `'\n'` characters written are translated to the system default line separator, [`os.linesep`](_3_library_os.html.md#os.linesep). If _newline_ is `''` or `'\n'`, no translation takes place. If _newline_ is any of the other legal values, any `'\n'` characters written are translated to the given string.
    

If _closefd_ is `False` and a file descriptor rather than a filename was given, the underlying file descriptor will be kept open when the file is closed. If a filename is given _closefd_ must be `True` (the default); otherwise, an error will be raised.

A custom opener can be used by passing a callable as _opener_. The underlying file descriptor for the file object is then obtained by calling _opener_ with (_file_, _flags_). _opener_ must return an open file descriptor (passing [`os.open`](_3_library_os.html.md#os.open) as _opener_ results in functionality similar to passing `None`).

The newly created file is [non-inheritable](_3_library_os.html.md#fd-inheritance).

The following example uses the [dir\_fd](_3_library_os.html.md#dir-fd) parameter of the [`os.open()`](_3_library_os.html.md#os.open) function to open a file relative to a given directory:
```
\>>> import os
\>>> dir\_fd \= os.open('somedir', os.O\_RDONLY)
\>>> def opener(path, flags):
...     return os.open(path, flags, dir\_fd\=dir\_fd)
...
\>>> with open('spamspam.txt', 'w', opener\=opener) as f:
...     print('This will be written to somedir/spamspam.txt', file\=f)
...
\>>> os.close(dir\_fd)  \# don't leak a file descriptor
```
The type of [file object](_3_glossary.html.md#term-file-object) returned by the [`open()`](_3_library_functions.html.md#open) function depends on the mode. When [`open()`](_3_library_functions.html.md#open) is used to open a file in a text mode (`'w'`, `'r'`, `'wt'`, `'rt'`, etc.), it returns a subclass of [`io.TextIOBase`](_3_library_io.html.md#io.TextIOBase) (specifically [`io.TextIOWrapper`](_3_library_io.html.md#io.TextIOWrapper)). When used to open a file in a binary mode with buffering, the returned class is a subclass of [`io.BufferedIOBase`](_3_library_io.html.md#io.BufferedIOBase). The exact class varies: in read binary mode, it returns an [`io.BufferedReader`](_3_library_io.html.md#io.BufferedReader); in write binary and append binary modes, it returns an [`io.BufferedWriter`](_3_library_io.html.md#io.BufferedWriter), and in read/write mode, it returns an [`io.BufferedRandom`](_3_library_io.html.md#io.BufferedRandom). When buffering is disabled, the raw stream, a subclass of [`io.RawIOBase`](_3_library_io.html.md#io.RawIOBase), [`io.FileIO`](_3_library_io.html.md#io.FileIO), is returned.

See also the file handling modules, such as [`fileinput`](_3_library_fileinput.html.md#module-fileinput), [`io`](_3_library_io.html.md#module-io) (where [`open()`](_3_library_functions.html.md#open) is declared), [`os`](_3_library_os.html.md#module-os), [`os.path`](_3_library_os.path.html.md#module-os.path), [`tempfile`](_3_library_tempfile.html.md#module-tempfile), and [`shutil`](_3_library_shutil.html.md#module-shutil).

Raises an [auditing event](_3_library_sys.html.md#auditing) `open` with arguments `file`, `mode`, `flags`.

The `mode` and `flags` arguments may have been modified or inferred from the original call.

Changed in version 3.3:

*   The _opener_ parameter was added.
    
*   The `'x'` mode was added.
    
* [`IOError`](_3_library_exceptions.html.md#IOError) used to be raised, it is now an alias of [`OSError`](_3_library_exceptions.html.md#OSError).
    
* [`FileExistsError`](_3_library_exceptions.html.md#FileExistsError) is now raised if the file opened in exclusive creation mode (`'x'`) already exists.
    

Changed in version 3.4:

*   The file is now non-inheritable.
    

Changed in version 3.5:

*   If the system call is interrupted and the signal handler does not raise an exception, the function now retries the system call instead of raising an [`InterruptedError`](_3_library_exceptions.html.md#InterruptedError) exception (see [**PEP 475**](https://peps.python.org/pep-0475/) for the rationale).
    
*   The `'namereplace'` error handler was added.
    

Changed in version 3.6:

*   Support added to accept objects implementing [`os.PathLike`](_3_library_os.html.md#os.PathLike).
    
*   On Windows, opening a console buffer may return a subclass of [`io.RawIOBase`](_3_library_io.html.md#io.RawIOBase) other than [`io.FileIO`](_3_library_io.html.md#io.FileIO).
    

Changed in version 3.11: The `'U'` mode has been removed.

ord(_c_)[¶](_3_library_functions.html.md#ord)

Given a string representing one Unicode character, return an integer representing the Unicode code point of that character. For example, `ord('a')` returns the integer `97` and `ord('€')` (Euro sign) returns `8364`. This is the inverse of [`chr()`](_3_library_functions.html.md#chr).

pow(_base_, _exp_, _mod\=None_)[¶](_3_library_functions.html.md#pow)

Return _base_ to the power _exp_; if _mod_ is present, return _base_ to the power _exp_, modulo _mod_ (computed more efficiently than `pow(base, exp) % mod`). The two-argument form `pow(base, exp)` is equivalent to using the power operator: `base**exp`.

The arguments must have numeric types. With mixed operand types, the coercion rules for binary arithmetic operators apply. For [`int`](_3_library_functions.html.md#int) operands, the result has the same type as the operands (after coercion) unless the second argument is negative; in that case, all arguments are converted to float and a float result is delivered. For example, `pow(10, 2)` returns `100`, but `pow(10, -2)` returns `0.01`. For a negative base of type [`int`](_3_library_functions.html.md#int) or [`float`](_3_library_functions.html.md#float) and a non-integral exponent, a complex result is delivered. For example, `pow(-9, 0.5)` returns a value close to `3j`.

For [`int`](_3_library_functions.html.md#int) operands _base_ and _exp_, if _mod_ is present, _mod_ must also be of integer type and _mod_ must be nonzero. If _mod_ is present and _exp_ is negative, _base_ must be relatively prime to _mod_. In that case, `pow(inv_base, -exp, mod)` is returned, where _inv\_base_ is an inverse to _base_ modulo _mod_.

Here’s an example of computing an inverse for `38` modulo `97`:
```
\>>> pow(38, \-1, mod\=97)
23
\>>> 23 \* 38 % 97 \== 1
True
```
Changed in version 3.8: For [`int`](_3_library_functions.html.md#int) operands, the three-argument form of `pow` now allows the second argument to be negative, permitting computation of modular inverses.

Changed in version 3.8: Allow keyword arguments. Formerly, only positional arguments were supported.

print(_\*objects_, _sep\=' '_, _end\='\\n'_, _file\=None_, _flush\=False_)[¶](_3_library_functions.html.md#print)

Print _objects_ to the text stream _file_, separated by _sep_ and followed by _end_. _sep_, _end_, _file_, and _flush_, if present, must be given as keyword arguments.

All non-keyword arguments are converted to strings like [`str()`](_3_library_stdtypes.html.md#str) does and written to the stream, separated by _sep_ and followed by _end_. Both _sep_ and _end_ must be strings; they can also be `None`, which means to use the default values. If no _objects_ are given, [`print()`](_3_library_functions.html.md#print) will just write _end_.

The _file_ argument must be an object with a `write(string)` method; if it is not present or `None`, [`sys.stdout`](_3_library_sys.html.md#sys.stdout) will be used. Since printed arguments are converted to text strings, [`print()`](_3_library_functions.html.md#print) cannot be used with binary mode file objects. For these, use `file.write(...)` instead.

Output buffering is usually determined by _file_. However, if _flush_ is true, the stream is forcibly flushed.

Changed in version 3.3: Added the _flush_ keyword argument.

_class_ property(_fget\=None_, _fset\=None_, _fdel\=None_, _doc\=None_)[¶](_3_library_functions.html.md#property)

Return a property attribute.

_fget_ is a function for getting an attribute value. _fset_ is a function for setting an attribute value. _fdel_ is a function for deleting an attribute value. And _doc_ creates a docstring for the attribute.

A typical use is to define a managed attribute `x`:
```
class C:
    def \_\_init\_\_(self):
        self.\_x \= None
    def getx(self):
        return self.\_x
    def setx(self, value):
        self.\_x \= value
    def delx(self):
        del self.\_x
    x \= property(getx, setx, delx, "I'm the 'x' property.")
```
If _c_ is an instance of _C_, `c.x` will invoke the getter, `c.x = value` will invoke the setter, and `del c.x` the deleter.

If given, _doc_ will be the docstring of the property attribute. Otherwise, the property will copy _fget_’s docstring (if it exists). This makes it possible to create read-only properties easily using [`property()`](_3_library_functions.html.md#property) as a [decorator](_3_glossary.html.md#term-decorator):
```
class Parrot:
    def \_\_init\_\_(self):
        self.\_voltage \= 100000
    @property
    def voltage(self):
        """Get the current voltage."""
        return self.\_voltage
```
The `@property` decorator turns the `voltage()` method into a “getter” for a read-only attribute with the same name, and it sets the docstring for _voltage_ to “Get the current voltage.”

@getter[¶](_3_library_functions.html.md#property.getter)

@setter[¶](_3_library_functions.html.md#property.setter)

@deleter[¶](_3_library_functions.html.md#property.deleter)

A property object has `getter`, `setter`, and `deleter` methods usable as decorators that create a copy of the property with the corresponding accessor function set to the decorated function. This is best explained with an example:
```
class C:
    def \_\_init\_\_(self):
        self.\_x \= None
    @property
    def x(self):
        """I'm the 'x' property."""
        return self.\_x
    @x.setter
    def x(self, value):
        self.\_x \= value
    @x.deleter
    def x(self):
        del self.\_x
```
This code is exactly equivalent to the first example. Be sure to give the additional functions the same name as the original property (`x` in this case.)

The returned property object also has the attributes `fget`, `fset`, and `fdel` corresponding to the constructor arguments.

Changed in version 3.5: The docstrings of property objects are now writeable.

_class_ range(_stop_) _class_ range(_start_, _stop_, _step\=1_)

Rather than being a function, [`range`](_3_library_stdtypes.html.md#range) is actually an immutable sequence type, as documented in [Ranges](_3_library_stdtypes.html.md#typesseq-range) and [Sequence Types — list, tuple, range](_3_library_stdtypes.html.md#typesseq).

repr(_object_)[¶](_3_library_functions.html.md#repr)

Return a string containing a printable representation of an object. For many types, this function makes an attempt to return a string that would yield an object with the same value when passed to [`eval()`](_3_library_functions.html.md#eval); otherwise, the representation is a string enclosed in angle brackets that contains the name of the type of the object together with additional information often including the name and address of the object. A class can control what this function returns for its instances by defining a [`__repr__()`](_3_reference_datamodel.html.md#object.__repr__) method. If [`sys.displayhook()`](_3_library_sys.html.md#sys.displayhook) is not accessible, this function will raise [`RuntimeError`](_3_library_exceptions.html.md#RuntimeError).

This class has a custom representation that can be evaluated:
```
class Person:
   def \_\_init\_\_(self, name, age):
      self.name \= name
      self.age \= age
   def \_\_repr\_\_(self):
      return f"Person('{self.name}', {self.age})"
```
reversed(_seq_)[¶](_3_library_functions.html.md#reversed)

Return a reverse [iterator](_3_glossary.html.md#term-iterator). _seq_ must be an object which has a [`__reversed__()`](_3_reference_datamodel.html.md#object.__reversed__) method or supports the sequence protocol (the [`__len__()`](_3_reference_datamodel.html.md#object.__len__) method and the [`__getitem__()`](_3_reference_datamodel.html.md#object.__getitem__) method with integer arguments starting at `0`).

round(_number_, _ndigits\=None_)[¶](_3_library_functions.html.md#round)

Return _number_ rounded to _ndigits_ precision after the decimal point. If _ndigits_ is omitted or is `None`, it returns the nearest integer to its input.

For the built-in types supporting [`round()`](_3_library_functions.html.md#round), values are rounded to the closest multiple of 10 to the power minus _ndigits_; if two multiples are equally close, rounding is done toward the even choice (so, for example, both `round(0.5)` and `round(-0.5)` are `0`, and `round(1.5)` is `2`). Any integer value is valid for _ndigits_ (positive, zero, or negative). The return value is an integer if _ndigits_ is omitted or `None`. Otherwise, the return value has the same type as _number_.

For a general Python object `number`, `round` delegates to `number.__round__`.

Note

The behavior of [`round()`](_3_library_functions.html.md#round) for floats can be surprising: for example, `round(2.675, 2)` gives `2.67` instead of the expected `2.68`. This is not a bug: it’s a result of the fact that most decimal fractions can’t be represented exactly as a float. See [Floating Point Arithmetic: Issues and Limitations](_3_tutorial_floatingpoint.html.md#tut-fp-issues) for more information.

_class_ set _class_ set(_iterable_)

Return a new [`set`](_3_library_stdtypes.html.md#set) object, optionally with elements taken from _iterable_. `set` is a built-in class. See [`set`](_3_library_stdtypes.html.md#set) and [Set Types — set, frozenset](_3_library_stdtypes.html.md#types-set) for documentation about this class.

For other containers see the built-in [`frozenset`](_3_library_stdtypes.html.md#frozenset), [`list`](_3_library_stdtypes.html.md#list), [`tuple`](_3_library_stdtypes.html.md#tuple), and [`dict`](_3_library_stdtypes.html.md#dict) classes, as well as the [`collections`](_3_library_collections.html.md#module-collections) module.

setattr(_object_, _name_, _value_)[¶](_3_library_functions.html.md#setattr)

This is the counterpart of [`getattr()`](_3_library_functions.html.md#getattr). The arguments are an object, a string, and an arbitrary value. The string may name an existing attribute or a new attribute. The function assigns the value to the attribute, provided the object allows it. For example, `setattr(x, 'foobar', 123)` is equivalent to `x.foobar = 123`.

_name_ need not be a Python identifier as defined in [Identifiers and keywords](_3_reference_lexical_analysis.html.md#identifiers) unless the object chooses to enforce that, for example in a custom [`__getattribute__()`](_3_reference_datamodel.html.md#object.__getattribute__) or via [`__slots__`](_3_reference_datamodel.html.md#object.__slots__). An attribute whose name is not an identifier will not be accessible using the dot notation, but is accessible through [`getattr()`](_3_library_functions.html.md#getattr) etc..

Note

Since [private name mangling](_3_reference_expressions.html.md#private-name-mangling) happens at compilation time, one must manually mangle a private attribute’s (attributes with two leading underscores) name in order to set it with [`setattr()`](_3_library_functions.html.md#setattr).

_class_ slice(_stop_)[¶](_3_library_functions.html.md#slice) _class_ slice(_start_, _stop_, _step\=None_)

Return a [slice](_3_glossary.html.md#term-slice) object representing the set of indices specified by `range(start, stop, step)`. The _start_ and _step_ arguments default to `None`.

start[¶](_3_library_functions.html.md#slice.start)

stop[¶](_3_library_functions.html.md#slice.stop)

step[¶](_3_library_functions.html.md#slice.step)

Slice objects have read-only data attributes `start`, `stop`, and `step` which merely return the argument values (or their default). They have no other explicit functionality; however, they are used by NumPy and other third-party packages.

Slice objects are also generated when extended indexing syntax is used. For example: `a[start:stop:step]` or `a[start:stop, i]`. See [`itertools.islice()`](_3_library_itertools.html.md#itertools.islice) for an alternate version that returns an [iterator](_3_glossary.html.md#term-iterator).

sorted(_iterable_, _/_, _\*_, _key\=None_, _reverse\=False_)[¶](_3_library_functions.html.md#sorted)

Return a new sorted list from the items in _iterable_.

Has two optional arguments which must be specified as keyword arguments.

_key_ specifies a function of one argument that is used to extract a comparison key from each element in _iterable_ (for example, `key=str.lower`). The default value is `None` (compare the elements directly).

_reverse_ is a boolean value. If set to `True`, then the list elements are sorted as if each comparison were reversed.

Use [`functools.cmp_to_key()`](_3_library_functools.html.md#functools.cmp_to_key) to convert an old-style _cmp_ function to a _key_ function.

The built-in [`sorted()`](_3_library_functions.html.md#sorted) function is guaranteed to be stable. A sort is stable if it guarantees not to change the relative order of elements that compare equal — this is helpful for sorting in multiple passes (for example, sort by department, then by salary grade).

The sort algorithm uses only `<` comparisons between items. While defining an [`__lt__()`](_3_reference_datamodel.html.md#object.__lt__) method will suffice for sorting, [**PEP 8**](https://peps.python.org/pep-0008/) recommends that all six [rich comparisons](_3_reference_expressions.html.md#comparisons) be implemented. This will help avoid bugs when using the same data with other ordering tools such as [`max()`](_3_library_functions.html.md#max) that rely on a different underlying method. Implementing all six comparisons also helps avoid confusion for mixed type comparisons which can call reflected the [`__gt__()`](_3_reference_datamodel.html.md#object.__gt__) method.

For sorting examples and a brief sorting tutorial, see [Sorting HOW TO](_3_howto_sorting.html.md#sortinghowto).

@staticmethod[¶](_3_library_functions.html.md#staticmethod)

Transform a method into a static method.

A static method does not receive an implicit first argument. To declare a static method, use this idiom:
```
class C:
    @staticmethod
    def f(arg1, arg2, argN): ...
```
The `@staticmethod` form is a function [decorator](_3_glossary.html.md#term-decorator) – see [Function definitions](_3_reference_compound_stmts.html.md#function) for details.

A static method can be called either on the class (such as `C.f()`) or on an instance (such as `C().f()`). Moreover, they can be called as regular functions (such as `f()`).

Static methods in Python are similar to those found in Java or C++. Also, see [`classmethod()`](_3_library_functions.html.md#classmethod) for a variant that is useful for creating alternate class constructors.

Like all decorators, it is also possible to call `staticmethod` as a regular function and do something with its result. This is needed in some cases where you need a reference to a function from a class body and you want to avoid the automatic transformation to instance method. For these cases, use this idiom:
```
def regular\_function():
    ...
class C:
    method \= staticmethod(regular\_function)
```
For more information on static methods, see [The standard type hierarchy](_3_reference_datamodel.html.md#types).

Changed in version 3.10: Static methods now inherit the method attributes (`__module__`, `__name__`, `__qualname__`, `__doc__` and `__annotations__`), have a new `__wrapped__` attribute, and are now callable as regular functions.

_class_ str(_object\=''_) _class_ str(_object\=b''_, _encoding\='utf-8'_, _errors\='strict'_)

Return a [`str`](_3_library_stdtypes.html.md#str) version of _object_. See [`str()`](_3_library_stdtypes.html.md#str) for details.

`str` is the built-in string [class](_3_glossary.html.md#term-class). For general information about strings, see [Text Sequence Type — str](_3_library_stdtypes.html.md#textseq).

sum(_iterable_, _/_, _start\=0_)[¶](_3_library_functions.html.md#sum)

Sums _start_ and the items of an _iterable_ from left to right and returns the total. The _iterable_’s items are normally numbers, and the start value is not allowed to be a string.

For some use cases, there are good alternatives to [`sum()`](_3_library_functions.html.md#sum). The preferred, fast way to concatenate a sequence of strings is by calling `''.join(sequence)`. To add floating point values with extended precision, see [`math.fsum()`](_3_library_math.html.md#math.fsum). To concatenate a series of iterables, consider using [`itertools.chain()`](_3_library_itertools.html.md#itertools.chain).

Changed in version 3.8: The _start_ parameter can be specified as a keyword argument.

_class_ super[¶](_3_library_functions.html.md#super) _class_ super(_type_, _object\_or\_type\=None_)

Return a proxy object that delegates method calls to a parent or sibling class of _type_. This is useful for accessing inherited methods that have been overridden in a class.

The _object\_or\_type_ determines the [method resolution order](_3_glossary.html.md#term-method-resolution-order) to be searched. The search starts from the class right after the _type_.

For example, if [`__mro__`](_3_library_stdtypes.html.md#class.__mro__) of _object\_or\_type_ is `D -> B -> C -> A -> object` and the value of _type_ is `B`, then [`super()`](_3_library_functions.html.md#super) searches `C -> A -> object`.

The [`__mro__`](_3_library_stdtypes.html.md#class.__mro__) attribute of the _object\_or\_type_ lists the method resolution search order used by both [`getattr()`](_3_library_functions.html.md#getattr) and [`super()`](_3_library_functions.html.md#super). The attribute is dynamic and can change whenever the inheritance hierarchy is updated.

If the second argument is omitted, the super object returned is unbound. If the second argument is an object, `isinstance(obj, type)` must be true. If the second argument is a type, `issubclass(type2, type)` must be true (this is useful for classmethods).

There are two typical use cases for _super_. In a class hierarchy with single inheritance, _super_ can be used to refer to parent classes without naming them explicitly, thus making the code more maintainable. This use closely parallels the use of _super_ in other programming languages.

The second use case is to support cooperative multiple inheritance in a dynamic execution environment. This use case is unique to Python and is not found in statically compiled languages or languages that only support single inheritance. This makes it possible to implement “diamond diagrams” where multiple base classes implement the same method. Good design dictates that such implementations have the same calling signature in every case (because the order of calls is determined at runtime, because that order adapts to changes in the class hierarchy, and because that order can include sibling classes that are unknown prior to runtime).

For both use cases, a typical superclass call looks like this:
```
class C(B):
    def method(self, arg):
        super().method(arg)    \# This does the same thing as:

                               \# super(C, self).method(arg)
```
In addition to method lookups, [`super()`](_3_library_functions.html.md#super) also works for attribute lookups. One possible use case for this is calling [descriptors](_3_glossary.html.md#term-descriptor) in a parent or sibling class.

Note that [`super()`](_3_library_functions.html.md#super) is implemented as part of the binding process for explicit dotted attribute lookups such as `super().__getitem__(name)`. It does so by implementing its own [`__getattribute__()`](_3_reference_datamodel.html.md#object.__getattribute__) method for searching classes in a predictable order that supports cooperative multiple inheritance. Accordingly, [`super()`](_3_library_functions.html.md#super) is undefined for implicit lookups using statements or operators such as `super()[name]`.

Also note that, aside from the zero argument form, [`super()`](_3_library_functions.html.md#super) is not limited to use inside methods. The two argument form specifies the arguments exactly and makes the appropriate references. The zero argument form only works inside a class definition, as the compiler fills in the necessary details to correctly retrieve the class being defined, as well as accessing the current instance for ordinary methods.

For practical suggestions on how to design cooperative classes using [`super()`](_3_library_functions.html.md#super), see [guide to using super()](https://rhettinger.wordpress.com/2011/05/26/super-considered-super/).

_class_ tuple _class_ tuple(_iterable_)

Rather than being a function, [`tuple`](_3_library_stdtypes.html.md#tuple) is actually an immutable sequence type, as documented in [Tuples](_3_library_stdtypes.html.md#typesseq-tuple) and [Sequence Types — list, tuple, range](_3_library_stdtypes.html.md#typesseq).

_class_ type(_object_)[¶](_3_library_functions.html.md#type) _class_ type(_name_, _bases_, _dict_, _\*\*kwds_)

With one argument, return the type of an _object_. The return value is a type object and generally the same object as returned by [`object.__class__`](_3_library_stdtypes.html.md#instance.__class__).

The [`isinstance()`](_3_library_functions.html.md#isinstance) built-in function is recommended for testing the type of an object, because it takes subclasses into account.

With three arguments, return a new type object. This is essentially a dynamic form of the [`class`](_3_reference_compound_stmts.html.md#class) statement. The _name_ string is the class name and becomes the [`__name__`](_3_library_stdtypes.html.md#definition.__name__) attribute. The _bases_ tuple contains the base classes and becomes the [`__bases__`](_3_library_stdtypes.html.md#class.__bases__) attribute; if empty, [`object`](_3_library_functions.html.md#object), the ultimate base of all classes, is added. The _dict_ dictionary contains attribute and method definitions for the class body; it may be copied or wrapped before becoming the [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute. The following two statements create identical [`type`](_3_library_functions.html.md#type) objects:
```
\>>> class X:
...     a \= 1
...
\>>> X \= type('X', (), dict(a\=1))
```
See also [Type Objects](_3_library_stdtypes.html.md#bltin-type-objects).

Keyword arguments provided to the three argument form are passed to the appropriate metaclass machinery (usually [`__init_subclass__()`](_3_reference_datamodel.html.md#object.__init_subclass__)) in the same way that keywords in a class definition (besides _metaclass_) would.

See also [Customizing class creation](_3_reference_datamodel.html.md#class-customization).

Changed in version 3.6: Subclasses of [`type`](_3_library_functions.html.md#type) which don’t override `type.__new__` may no longer use the one-argument form to get the type of an object.

vars()[¶](_3_library_functions.html.md#vars) vars(_object_)

Return the [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute for a module, class, instance, or any other object with a [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute.

Objects such as modules and instances have an updateable [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute; however, other objects may have write restrictions on their [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attributes (for example, classes use a [`types.MappingProxyType`](_3_library_types.html.md#types.MappingProxyType) to prevent direct dictionary updates).

Without an argument, [`vars()`](_3_library_functions.html.md#vars) acts like [`locals()`](_3_library_functions.html.md#locals). Note, the locals dictionary is only useful for reads since updates to the locals dictionary are ignored.

A [`TypeError`](_3_library_exceptions.html.md#TypeError) exception is raised if an object is specified but it doesn’t have a [`__dict__`](_3_library_stdtypes.html.md#object.__dict__) attribute (for example, if its class defines the [`__slots__`](_3_reference_datamodel.html.md#object.__slots__) attribute).

zip(_\*iterables_, _strict\=False_)[¶](_3_library_functions.html.md#zip)

Iterate over several iterables in parallel, producing tuples with an item from each one.

Example:
```
\>>> for item in zip(\[1, 2, 3\], \['sugar', 'spice', 'everything nice'\]):
...     print(item)
...
(1, 'sugar')
(2, 'spice')
(3, 'everything nice')
```
More formally: [`zip()`](_3_library_functions.html.md#zip) returns an iterator of tuples, where the _i_\-th tuple contains the _i_\-th element from each of the argument iterables.

Another way to think of [`zip()`](_3_library_functions.html.md#zip) is that it turns rows into columns, and columns into rows. This is similar to [transposing a matrix](https://en.wikipedia.org/wiki/Transpose).

[`zip()`](_3_library_functions.html.md#zip) is lazy: The elements won’t be processed until the iterable is iterated on, e.g. by a `for` loop or by wrapping in a [`list`](_3_library_stdtypes.html.md#list).

One thing to consider is that the iterables passed to [`zip()`](_3_library_functions.html.md#zip) could have different lengths; sometimes by design, and sometimes because of a bug in the code that prepared these iterables. Python offers three different approaches to dealing with this issue:

*   By default, [`zip()`](_3_library_functions.html.md#zip) stops when the shortest iterable is exhausted. It will ignore the remaining items in the longer iterables, cutting off the result to the length of the shortest iterable:
    
    ```
    \>>> list(zip(range(3), \['fee', 'fi', 'fo', 'fum'\]))
    \[(0, 'fee'), (1, 'fi'), (2, 'fo')\]
    
    ```
    
* [`zip()`](_3_library_functions.html.md#zip) is often used in cases where the iterables are assumed to be of equal length. In such cases, it’s recommended to use the `strict=True` option. Its output is the same as regular [`zip()`](_3_library_functions.html.md#zip):
    
    ```
    \>>> list(zip(('a', 'b', 'c'), (1, 2, 3), strict\=True))
    \[('a', 1), ('b', 2), ('c', 3)\]
    
    ```
    
    Unlike the default behavior, it raises a [`ValueError`](_3_library_exceptions.html.md#ValueError) if one iterable is exhausted before the others:
    
    ```
    \>>> for item in zip(range(3), \['fee', 'fi', 'fo', 'fum'\], strict\=True):  
    ...     print(item)
    ...
    (0, 'fee')
    (1, 'fi')
    (2, 'fo')
    Traceback (most recent call last):
      ...
    ValueError: zip() argument 2 is longer than argument 1
    
    ```
    
    Without the `strict=True` argument, any bug that results in iterables of different lengths will be silenced, possibly manifesting as a hard-to-find bug in another part of the program.
    
*   Shorter iterables can be padded with a constant value to make all the iterables have the same length. This is done by [`itertools.zip_longest()`](_3_library_itertools.html.md#itertools.zip_longest).
    

Edge cases: With a single iterable argument, [`zip()`](_3_library_functions.html.md#zip) returns an iterator of 1-tuples. With no arguments, it returns an empty iterator.

Tips and tricks:

*   The left-to-right evaluation order of the iterables is guaranteed. This makes possible an idiom for clustering a data series into n-length groups using `zip(*[iter(s)]*n, strict=True)`. This repeats the _same_ iterator `n` times so that each output tuple has the result of `n` calls to the iterator. This has the effect of dividing the input into n-length chunks.
    
* [`zip()`](_3_library_functions.html.md#zip) in conjunction with the `*` operator can be used to unzip a list:
    
    ```
    \>>> x \= \[1, 2, 3\]
    \>>> y \= \[4, 5, 6\]
    \>>> list(zip(x, y))
    \[(1, 4), (2, 5), (3, 6)\]
    \>>> x2, y2 \= zip(\*zip(x, y))
    \>>> x \== list(x2) and y \== list(y2)
    True
    
    ```
    

Changed in version 3.10: Added the `strict` argument.

\_\_import\_\_(_name_, _globals\=None_, _locals\=None_, _fromlist\=()_, _level\=0_)[¶](_3_library_functions.html.md#import__)

This function is invoked by the [`import`](_3_reference_simple_stmts.html.md#import) statement. It can be replaced (by importing the [`builtins`](_3_library_builtins.html.md#module-builtins) module and assigning to `builtins.__import__`) in order to change semantics of the `import` statement, but doing so is **strongly** discouraged as it is usually simpler to use import hooks (see [**PEP 302**](https://peps.python.org/pep-0302/)) to attain the same goals and does not cause issues with code which assumes the default import implementation is in use. Direct use of [`__import__()`](_3_library_functions.html.md#import__) is also discouraged in favor of [`importlib.import_module()`](_3_library_importlib.html.md#importlib.import_module).

The function imports the module _name_, potentially using the given _globals_ and _locals_ to determine how to interpret the name in a package context. The _fromlist_ gives the names of objects or submodules that should be imported from the module given by _name_. The standard implementation does not use its _locals_ argument at all and uses its _globals_ only to determine the package context of the [`import`](_3_reference_simple_stmts.html.md#import) statement.

_level_ specifies whether to use absolute or relative imports. `0` (the default) means only perform absolute imports. Positive values for _level_ indicate the number of parent directories to search relative to the directory of the module calling [`__import__()`](_3_library_functions.html.md#import__) (see [**PEP 328**](https://peps.python.org/pep-0328/) for the details).

When the _name_ variable is of the form `package.module`, normally, the top-level package (the name up till the first dot) is returned, _not_ the module named by _name_. However, when a non-empty _fromlist_ argument is given, the module named by _name_ is returned.

For example, the statement `import spam` results in bytecode resembling the following code:
```
spam \= \_\_import\_\_('spam', globals(), locals(), \[\], 0)
```
The statement `import spam.ham` results in this call:
```
spam \= \_\_import\_\_('spam.ham', globals(), locals(), \[\], 0)
```
Note how [`__import__()`](_3_library_functions.html.md#import__) returns the toplevel module here because this is the object that is bound to a name by the [`import`](_3_reference_simple_stmts.html.md#import) statement.

On the other hand, the statement `from spam.ham import eggs, sausage as saus` results in
```
\_temp \= \_\_import\_\_('spam.ham', globals(), locals(), \['eggs', 'sausage'\], 0)
eggs \= \_temp.eggs
saus \= \_temp.sausage
```
Here, the `spam.ham` module is returned from [`__import__()`](_3_library_functions.html.md#import__). From this object, the names to import are retrieved and assigned to their respective names.

If you simply want to import a module (potentially within a package) by name, use [`importlib.import_module()`](_3_library_importlib.html.md#importlib.import_module).

Changed in version 3.3: Negative values for _level_ are no longer supported (which also changes the default value to 0).

Changed in version 3.9: When the command line options [`-E`](_3_using_cmdline.html.md#cmdoption-E) or [`-I`](_3_using_cmdline.html.md#cmdoption-I) are being used, the environment variable [`PYTHONCASEOK`](_3_using_cmdline.html.md#envvar-PYTHONCASEOK) is now ignored.

Footnotes

