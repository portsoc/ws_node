ws_node
=======

An intro to node.


Running Tests
-------------

We continue to use QUnit to define tests that you should attempt to complete.  
The difference now is that there is no browser – you must install the source 
code and the test framework and then run the tests from the command line:

1. To download the code, either use git (the simplest option):

  ```bash
  git clone https://github.com/portsoc/ws_node.git
  ```
  or download and unpack the [zip](https://github.com/portsoc/ws_node/archive/master.zip) 
  which on linux can be achieved using
  ```bash
  wget https://github.com/portsoc/ws_node/archive/master.zip
  ```
  then
  ```bash
  unzip master.zip
  ```

2. To download the QUnit files (and any libraries it uses, which you need to do before the first run of tests, but just the once) type:

  ```bash
  npm init
  ```

3. Run the tests by typing:

  ```bash
  npm test
  ```
