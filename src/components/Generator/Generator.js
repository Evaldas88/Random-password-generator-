import React, { useState, useEffect, useRef } from 'react'

const Generator = () => {
  const [password, setPassword] = useState('')
  const [passWords, setPasswords] = useState([])
  const [passwordLength, setPasswordLength] = useState(7)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [errors, setErrors] = useState({})
  const passwordInput = useRef(null);

  useEffect(() => {
    const lsItems = localStorage.getItem("items");
    if (!lsItems) {
      localStorage.setItem("items", JSON.stringify(lsItems));
    } else {
      setPasswords(JSON.parse(lsItems));
      setPassword(passWords[0]);
    }
  }, []);

  useEffect(() => { localStorage.setItem('items', JSON.stringify(passWords)) }, [passWords])



  const generatePassword = () => {
    setErrors({})
    if (!uppercase && !lowercase && !numbers && !symbols) {
      return setErrors('At least one character type must be selected')
    } else if (passwordLength === '0') {
      return setErrors('Password length cannot be 0')
    } else if (passwordLength === '') {
      return setErrors('Invalid password length')
    } else if (passwordLength > 50) {
      return setErrors('Password length cannot exceed 50 characters')
    }

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      let choice = random(0, 3)
      if (lowercase && choice === 0) {
        password += randomLower()
      } else if (uppercase && choice === 1) {
        password += randomUpper()
      } else if (symbols && choice === 2) {
        password += randomSymbol()
      } else if (numbers && choice === 3) {
        password += random(0, 9)
      } else {
        i--
      }
    }
    setPassword([...password])
    // setPasswords(password)
    let passw = [...passWords, { passw: password }]
    if (passw.length > 10) passw.splice(0, 1);
    setPasswords(passw);
  }
  const reset = () => {
    setUppercase(true);
    setLowercase(true);
    setNumbers(false);
    setSymbols(false);
    passwordInput.current.value = "";
    setPassword("");
    setPasswords([]);

  };

  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  const randomLower = () => {
    return String.fromCharCode(random(97, 122))
  }

  const randomUpper = () => {
    return String.fromCharCode(random(65, 90))
  }

  const randomSymbol = () => {
    const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>"
    return symbols[random(0, symbols.length - 1)]
  }



  return (
    <div className="height-min mt-5">
      <div className="container p-5 d-flex justify-content-center mt-5 ">
        <div className=" card w-50 text-bg-light">
          <div className="card-body">
            <h1 className=" card-title text-center p-5">Generator</h1>
            <form className="col-12 d-flex m-3 justify-content-center pe-3">
              <span>Password lenght:</span>
              <div className="col-5  px-5">
                <input
                  type='number'
                  ref={passwordInput}
                  defaultValue={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)}
                />
              </div>
            </form>
            <div >
              <label className='pe-3'> Uppercase Letters</label>
              <input
                type='checkbox'
                name='uppercase'
                defaultChecked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
            </div>

            <div>
              <label className='pe-3'> Lowercase Letters</label>
              <input
                type='checkbox'
                name='lowercase'
                defaultChecked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
              />
            </div>

            <div >
              <label className='pe-3'> Numbers</label>
              <input
                type='checkbox'
                name='numbers'
                defaultChecked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
              />
            </div>

            <div>
              <label className='pe-3'> Symbols</label>
              <input
                type='checkbox'
                name='symbols'
                defaultChecked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
              />
            </div>

            {errors.length && <li className='error'>{errors}</li>}

            <div >
              <input
              className='btn button-collor'
                type='submit'
                name='generate'
                value='Generate'
                onClick={generatePassword}
              />
            </div>
            <div >
              <input
                className='btn button-collor mt-2'
                type='submit'
                name='reset'
                value='reset'
                onClick={reset}
              />
            </div>
            <div className="card card-with  mt-2" >
              <div className="card-body">
                <h1 className="card-title text-center mb-4">{password}</h1>
                {passWords
                  ? passWords.map((item, i) => {
                    if (item.passw !== password)
                      return (
                        <p className="card-text text-center mb-1" key={item + i}>
                          {item.passw}
                        </p>
                      );
                  })
                  : "Generate your password!"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Generator