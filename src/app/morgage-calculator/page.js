"use client";
import Image from "next/image";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home() {
  const [homePrice, setHomePrice] = useState("252100");
  const [zipCode, setZipCode] = useState("411009");
  const [downPayment, setDownPayment] = useState("10000");
  const [downPaymentRatio, setDownPaymentRatio] = useState("20");
  const [interestRate, setInterestRate] = useState("6.500");
  const [loanLength, setLoanLength] = useState("30");
  const [propertyTax, setPropertyTax] = useState("265");
  const [homeInsurance, setHomeInsurance] = useState("132");
  const [hoaFees, setHoaFees] = useState("132");
  const [utilities, setUtilities] = useState("100");
  const [pmi, setPmi] = useState("100");
  const [principalAndInterest, setPrincipalAndInterest] = useState("2114");
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState("2843");

  const cleanNumber = (value) => Number(value.replace(/,/g, ""));
  const addComasToNumber = (value) => {
    if (!isNaN(value) && value !== "") {
      return Number(value).toLocaleString();
    } else {
      return "";
    }
  };

  const calculateMonthlyPayment = () => {
    const principal = cleanNumber(homePrice) - cleanNumber(downPayment);
    const monthlyInterestRate = cleanNumber(interestRate) / 100 / 12;
    const numPayments = cleanNumber(loanLength) * 12;

    let principalAndInterest = 0;
    if (monthlyInterestRate > 0) {
      principalAndInterest =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numPayments)) /
        (Math.pow(1 + monthlyInterestRate, numPayments) - 1);
    } else {
      principalAndInterest = principal / numPayments;
    }

    // Total Monthly Payment = P&I + Taxes + Insurance + HOA + Utilities
    const totalMonthlyPayment =
      principalAndInterest +
      cleanNumber(propertyTax) +
      cleanNumber(homeInsurance) +
      cleanNumber(hoaFees) +
      cleanNumber(utilities);
    setPrincipalAndInterest(addComasToNumber(Math.round(principalAndInterest)));
    setTotalMonthlyPayment(addComasToNumber(Math.round(totalMonthlyPayment)));
  };

  const handleSliderChange = (e) => {
    const rawValue = cleanNumber(e.target.value);
    setHomePrice(addComasToNumber(rawValue));
    setDownPayment(((rawValue * downPaymentRatio) / 100).toLocaleString());
    calculateMonthlyPayment();
  };
  function handleHomePriceChange(e) {
    const newPrice = cleanNumber(e.target.value);
    setHomePrice(newPrice.toLocaleString());
    setDownPayment(((newPrice * downPaymentRatio) / 100).toLocaleString());
    calculateMonthlyPayment;
  }
  function handleDownPaymentChange(e) {
    const newPayment = cleanNumber(e.target.value);
    setDownPayment(newPayment.toLocaleString());
    setDownPaymentRatio(
      ((newPayment / cleanNumber(homePrice)) * 100).toFixed(2)
    );
    calculateMonthlyPayment;
  }

  function handleDownPaymentRatioChange(e) {
    const newRatio = cleanNumber(e.target.value);
    setDownPaymentRatio(newRatio.toLocaleString());
    setDownPayment(
      ((cleanNumber(homePrice) * newRatio) / 100).toLocaleString()
    );
    calculateMonthlyPayment();
  }

  function handleloanLengthChange(e) {
    setLoanLength(e.target.value);
    calculateMonthlyPayment();
  }
  function handleInterestRateChange(e) {
    setInterestRate(e.target.value);
    calculateMonthlyPayment();
  }

  function handleHomeInsuranceChange(e) {
    setHomeInsurance(e.target.value);
    calculateMonthlyPayment();
  }
  function handleHoaFeesChange(e) {
    setHoaFees(e.target.value);
    calculateMonthlyPayment();
  }
  function handlePropertyTaxChange(e) {
    setPropertyTax(e.target.value);
    calculateMonthlyPayment();
  }
  function handleHoaFeesChange(e) {
    setHoaFees(e.target.value);
    calculateMonthlyPayment();
  }
  function handleUtilitiesChange(e) {
    setUtilities(e.target.value);
    calculateMonthlyPayment();
  }
  function handleHomePmiChange(e) {
    setPmi(e.target.value);
    calculateMonthlyPayment();
  }

  const paymentBreakdown = [
    {
      label: "Principal & Interest",
      value: Number(cleanNumber(principalAndInterest)),
      color: "fill-gray-800",
    },
    { label: "Property Taxes", value: propertyTax, color: "fill-blue-500" },
    { label: "Home Insurance", value: homeInsurance, color: "fill-green-400" },
    { label: "HOA Fees", value: hoaFees, color: "fill-yellow-400" },
    { label: "Utilities", value: utilities, color: "fill-purple-400" },
    { label: "PMI", value: pmi, color: "fill-red-400" },
  ];

  const totalWidth = 400; // Total width of SVG
  const totalValue = paymentBreakdown.reduce(
    (sum, item) => sum + Number(item.value),
    0
  );
  let xPosition = 0;

  return (
    <div className="w-full">
      <Navbar />
      <section className="bg-green-100 py-16">
        <div className="m-auto max-w-screen-2xl px-6 md:px-14">
          <div className="flex flex-col justify-between gap-x-8">
            <div className="flex-1">
              <h1 className="font-bold text-gray-900 leading-tight text-2xl md:text-3xl tracking-tight md:tracking-tighter">
                Mortgage calculator
              </h1>
              <p className="text-gray-600 text-base my-6 pb-4 lg:max-w-3xl">
                Our mortgage calculator includes key factors like homeowners
                association fees, property taxes, and private mortgage insurance
                (PMI). Get the whole picture and calculate your total monthly
                payment.
              </p>
              <div className="mb-6 flex w-full items-end gap-4">
                <div className="grow max-w-[300px]">
                  <label
                    className="text-gray-900 font-bold block text-sm md:text-base"
                    htmlFor="home-price"
                  >
                    Home price
                  </label>
                  <div className="relative w-full">
                    <div className="relative text-textPrimary rounded-md bg-white w-32  md:w-full border border-gray-300 pt-1 h-12 lg:h-16">
                      <span className="absolute left-2 top-5 md:left-4 md:top-8 transform -translate-y-1/2 text-2xl md:text-5xl">
                        $
                      </span>
                      <input
                        id="home-price"
                        type="tel"
                        className=" pl-6 md:pl-14 w-full text-textPrimary bg-transparent outline-none text-2xl md:text-5xl "
                        value={homePrice}
                        onChange={handleHomePriceChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="grow max-w-[300px] p-3">
                  <p className="text-gray-900 font-bold block text-sm md:text-base">
                    Monthly payment
                  </p>
                  <p className="text-2xl md:text-5xl font-bold text-gray-900 flex items-baseline">
                    ${totalMonthlyPayment}/mo
                  </p>
                </div>
                <div className="hidden md:block">
                  <a
                    className="rounded-md text-base font-bold text-white bg-green-600 px-6 h-12 flex items-center justify-center min-w-[220px] hover:bg-green-700"
                    href="/preapproval/nxt-purchase"
                  >
                    Get pre-approved
                  </a>
                </div>
              </div>
              <div className="relative mx-4 mt-8 mb-6">
                <input
                  type="range"
                  min="50000"
                  max="3000000"
                  step="100"
                  value={cleanNumber(homePrice)}
                  onChange={handleSliderChange}
                  className="w-full cursor-pointer appearance-none focus:outline-none bg-gray-300 rounded-lg h-2 accent-gray-800"
                  style={{
                    background: `linear-gradient(to right, #292B29 ${
                      ((cleanNumber(homePrice) - 50000) / (3000000 - 50000)) *
                      100
                    }%, #C8C9C6 ${
                      ((cleanNumber(homePrice) - 50000) / (3000000 - 50000)) *
                      100
                    }%, #C8C9C6 100%)`,
                  }}
                />
              </div>

              {/* big screen view block */}
              <div className="mt-10 hidden md:block">
                <div className="gap-x-20 gap-y-2 lg:flex text-textPrimary">
                  <div className="flex flex-col md:flex-row flex-1 mb-6 gap-4">
                    <div className="flex-1 relative">
                      <label className="absolute left-4 top-2 text-xs text-gray-500">
                        ZIP Code
                      </label>
                      <input
                        type="tel"
                        maxLength="5"
                        className="w-full p-4 pt-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 relative">
                      <label className="absolute left-4 top-2 text-xs text-gray-500">
                        Down Payment
                      </label>
                      <input
                        type="tel"
                        className="w-full p-4 pt-6 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={downPayment}
                        onChange={handleDownPaymentChange}
                      />
                      <span className="absolute left-3 top-6 text-gray-500">
                        $
                      </span>
                    </div>
                    <div className="w-1/4 relative">
                      <label className="absolute left-4 top-2 text-xs text-gray-500">
                        Ratio
                      </label>
                      <span className="absolute left-3 top-6 text-gray-500">
                        %
                      </span>
                      <input
                        type="tel"
                        className="w-full pl-8 p-4 pt-6 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={downPaymentRatio}
                        onChange={handleDownPaymentRatioChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row flex-1 mb-6 gap-4">
                    <div className="flex-1 relative">
                      <label className="absolute left-4 top-2 text-xs text-gray-500">
                        Interest Rate
                      </label>
                      <input
                        type="tel"
                        className="w-full p-4 pt-6 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={interestRate}
                        onChange={handleInterestRateChange}
                      />
                      <span className="absolute right-3 top-6 text-gray-500">
                        %
                      </span>
                    </div>
                    <div className="flex-1 relative">
                      <label className="absolute left-4 top-2 text-xs text-gray-500">
                        Length of Loan
                      </label>
                      <select
                        className="w-full p-4 pt-7 bg-white rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={loanLength}
                        onChange={handleloanLengthChange}
                      >
                        <option value="30">30 years</option>
                        <option value="20">20 years</option>
                        <option value="15">15 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile view block */}
              <div className="block md:hidden">
                <div className="flex flex-col mb-2 gap-2">
                  <a
                    className="rounded-lg text-base font-bold text-center select-none outline-none transition duration-300 ease-in-out 
      focus:shadow-[0_0_0_4px_inset] disabled:text-gray-400 disabled:bg-gray-300 disabled:shadow-none 
      text-white bg-interactivePrimary hover:interactivePrimary focus:interactivePrimary focus:interactivePrimary active:interactivePrimary 
      px-6 h-12 w-auto inline-flex items-center justify-center min-w-[220px]"
                    href="/preapproval/nxt-purchase"
                  >
                    Get pre-approved
                  </a>
                </div>

                <button
                  className="rounded-lg text-base font-bold text-center select-none outline-none transition duration-300 ease-in-out 
    focus:shadow-[0_0_0_4px_inset] disabled:text-gray-400 disabled:bg-gray-300 disabled:shadow-none 
    text-gray-700 bg-transparent border border-gray-400 hover:text-accentBorderSecondary hover:border-transparent 
    hover:shadow-[0_0_0_4px_inset] hover:shadow-accentBorderSecondary focus:border-transparent focus:shadow-accentBorderSecondary 
    active:text-accentBorderSecondary px-6 h-12 mt-4 flex w-full items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 mr-2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  Add details
                </button>

                <div
                  className="transition-opacity duration-[var(--motion-timing-T3)] ease-[var(--motion-easing-universal)] 
    group-hover:opacity-100 group-hover:visible p-4 bg-white px-6 shadow-lg fixed left-0 top-[70px] 
    w-full z-[10000] invisible opacity-0"
                  data-qa="mobile-header"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Home price
                      </p>
                      <p
                        className="text-base font-bold text-white bg-gray-700 rounded-lg py-1 text-center"
                        data-qa="mobile-header-home-price"
                      >
                        $50,000
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">
                        Monthly payment
                      </p>
                      <p
                        className="text-base font-bold text-gray-700 pt-1"
                        data-qa="mobile-header-monthly-payment"
                      >
                        $632/mo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 pt-16">
        <div className="m-auto max-w-screen-2xl px-6 md:px-14">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="w-full max-w-screen-md mx-auto">
              <h4 className="font-bold text-gray-900 text-base md:text-lg">
                Monthly payment breakdown
              </h4>
              <p className="text-3xl font-bold text-gray-900 mt-6">
                ${totalValue}/mo
              </p>
              <div className="mt-8 w-full">
                <svg
                  height="80"
                  width="100%"
                  viewBox={`0 0 ${totalWidth} 80`}
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin meet"
                >
                  {paymentBreakdown.map((item, index) => {
                    const width = (item.value / totalValue) * totalWidth;
                    const rect = (
                      <rect
                        key={index}
                        height="80"
                        rx="10"
                        ry="10"
                        className={item.color}
                        width={width}
                        x={xPosition}
                        y="0"
                      ></rect>
                    );
                    xPosition += width; // Move the next rect to the right
                    return rect;
                  })}
                </svg>
              </div>
            </div>

            <div>
              {[
                {
                  label: "Principal & Interest",
                  value: principalAndInterest,
                  color: "bg-gray-800",
                },
                {
                  label: "Property Taxes",
                  value: "265",
                  color: "bg-blue-500",
                  input: (
                    <div className="w-40 flex-1 relative">
                      <input
                        type="tel"
                        className="w-full text-right p-3 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={propertyTax}
                        onChange={handlePropertyTaxChange}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        $
                      </span>
                    </div>
                  ),
                },
                {
                  label: "Homeowners Insurance",
                  value: "132",
                  color: "bg-green-400",
                  input: (
                    <div className="w-40 flex-1 relative">
                      <input
                        type="tel"
                        className="w-full text-right p-3 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={homeInsurance}
                        onChange={handleHomeInsuranceChange}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        $
                      </span>
                    </div>
                  ),
                },
                {
                  label: "HOA Fees",
                  value: "132",
                  color: "bg-yellow-400",
                  input: (
                    <div className="w-40 flex-1 relative">
                      <input
                        type="tel"
                        className="w-full text-right p-3 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={hoaFees}
                        onChange={handleHoaFeesChange}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        $
                      </span>
                    </div>
                  ),
                },
                {
                  label: "Utilities",
                  value: "100",
                  color: "bg-purple-400",
                  input: (
                    <div className="w-40 flex-1 relative">
                      <input
                        type="tel"
                        className="w-full text-right p-3 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={utilities}
                        onChange={handleUtilitiesChange}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        $
                      </span>
                    </div>
                  ),
                },
                {
                  label: "PMI",
                  value: "100",
                  color: "bg-red-400",
                  input: (
                    <div className="w-40 flex-1 relative">
                      <input
                        type="tel"
                        className="w-full text-right p-3 pl-8 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        value={pmi}
                        onChange={handleHomePmiChange}
                      />
                      <span className="absolute left-3 top-3 text-gray-500">
                        $
                      </span>
                    </div>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center h-12 mb-4"
                >
                  <div className="flex items-center w-1/2">
                    <div
                      className={`h-3 w-3 mr-3 ${item.color} rounded-sm`}
                    ></div>
                    <p className="text-gray-900 text-base">{item.label}</p>
                  </div>
                  <div className="text-gray-900 font-bold w-1/2 text-left">
                    {item.input ? item.input : `$${item.value}`}
                  </div>
                </div>
              ))}
              <button className="mt-6 inline-block rounded-md bg-blue-600 text-white px-6 py-3 font-bold hover:bg-blue-700">
                Copy estimate link
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-accentBorderInverseSecondary">
        <section className="gap-x-lg [&>p]:text-textSecondary py-16 md:flex-row [&>h2]:mb-xl [&>h3]:my-lg [&>p]:my-sm m-auto max-w-screen-2xl justify-between px-6 md:px-14">
          <hr className="my-12 border-t border-strokeDivider" />
          <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
            How does a mortgage calculator help me?
          </h2>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            When deciding how much house you can afford, one of the most
            important pieces to determine is whether a home will fit into your
            monthly budget. A mortgage calculator helps you understand the
            monthly cost of a home. And ours will allow you to enter different
            down payments and interest rates to help determine what is
            affordable for you.
          </p>
          <hr className="my-12 border-t border-strokeDivider"></hr>
          <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
            How much monthly mortgage payment can I afford?
          </h2>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Lenders determine how much you can afford on a monthly housing
            payment by calculating your{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="/content/what-is-a-good-debt-to-income-ratio/"
            >
              debt-to-income ratio (DTI)
            </a>
            . The maximum DTI you can have in order to qualify for most mortgage
            loans is often between 45-50%, with your anticipated housing costs
            included.
          </p>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Your DTI is the balance between your income and your debt. It helps
            lenders understand how safe or risky it is for them to approve your
            loan. A DTI ratio represents how much of your gross monthly income
            is spoken for by creditors, and how much of it is left over to you
            as disposable income. It’s most commonly written as a percentage.
            For example, if you pay half your monthly income in debt payments,
            you would have a DTI of 50%.
          </p>
          <div className="flex flex-col items-center">
            <div>
              <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                Formula for calculating your debt-to-income (DTI) ratio:
              </p>
              <img
                alt="Mortgage calculator | Debt to income ratio (DTI) formula"
                loading="lazy"
                width="780"
                height="153"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="https://media.better.com/better-com/mortgage-calculator/dti-formula.jpg"
              />
              <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base my-sm">
                Here’s an example of what calculating your DTI might look like:
              </p>
              <img
                alt="Mortgage calculator | Debt to income ratio (DTI) formula example"
                loading="lazy"
                width="780"
                height="525"
                decoding="async"
                data-nimg="1"
                style={{ color: "transparent" }}
                src="https://media.better.com/better-com/mortgage-calculator/dti-example.jpg"
              />
            </div>
          </div>
          <hr className="my-12 border-t border-strokeDivider"></hr>
          <h2 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-xl md:text-2xl md:tracking-tight">
            How to calculate monthly mortgage payments?
          </h2>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Your monthly mortgage payment includes loan principal and interest,
            property taxes, homeowners insurance, and mortgage insurance (PMI),
            if applicable. While not typically included in your mortgage
            payment, homeowners also pay monthly utilities and sometimes pay
            homeowners association (HOA) fees, so it’s a good idea to factor
            these into your monthly budget. This mortgage calculator factors in
            all these typical monthly costs so you can really crunch the
            numbers.
          </p>
          <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
            Formula for calculating monthly mortgage payments
          </h3>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            The easiest way to calculate your mortgage payment is to use a
            calculator, but for the curious or mathematically inclined, here’s
            the formula for calculating principal and interest yourself:
          </p>
          <div className="flex flex-col items-center">
            <div>
              <img
                alt="Mortgage calculator | Monthly mortgage payment formula"
                loading="lazy"
                width="780"
                height="126"
                decoding="async"
                className="w-full h-auto"
                src="https://media.better.com/better-com/mortgage-calculator/monthly-mortgage-payments-formula.jpg"
              />
              <div>
                <p className="text-base text-gray-900 my-4 text-left">Where:</p>
                <ul className="ml-8 list-disc text-gray-900">
                  <li className="my-2">
                    <b>M</b> is monthly mortgage payments
                  </li>
                  <li className="my-2">
                    <b>P</b> is the principal loan amount (the amount you
                    borrow)
                  </li>
                  <li className="my-2">
                    <b>r</b> is the monthly interest rate
                    <br />
                    <span className="text-sm">
                      (annual interest rate divided by 12 and expressed as a
                      decimal)
                    </span>
                    <br />
                    <small>
                      For example:
                      <br />
                      if the annual interest rate is <b>5%</b>, the monthly rate
                      would be <b>0.05/12</b> = .00417, or <b>.417%</b>
                    </small>
                  </li>
                  <li className="my-2">
                    <b>n</b> is the total number of payments in months
                    <br />
                    <small>
                      For example:
                      <br />
                      for a 30-year loan, n = 30x12 = <b>360</b> months
                    </small>
                  </li>
                </ul>
                <p className="text-base text-gray-900 my-4 text-left">
                  Here's a simple example:
                </p>
                <img
                  alt="Mortgage calculator | Monthly mortgage payment formula example"
                  loading="lazy"
                  width="780"
                  height="221"
                  decoding="async"
                  className="w-full h-auto"
                  src="https://media.better.com/better-com/mortgage-calculator/monthly-mortgage-payments-example.jpg"
                />
              </div>
            </div>
          </div>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            This formula assumes a fixed-rate mortgage, where the interest rate
            remains constant throughout the loan term. And remember, you’ll
            still need to add on taxes, insurance, utilities, and HOA fees if
            applicable.
          </p>
          <hr className="my-12 border-t border-strokeDivider"></hr>
          <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
            How to use this mortgage calculator?
          </h3>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Play around with different home prices, locations,{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="/faq/loan-process/down-payment-definition/"
            >
              down payments
            </a>
            , interest rates, and mortgage lengths to see how they impact your
            monthly mortgage payments.
          </p>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Increasing your down payment and decreasing your interest rate and
            mortgage term length will make your monthly payment go down. Taxes,
            insurance, and HOA fees will vary by location. If you enter a down
            payment amount that’s less than 20% of the home price,{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="/content/what-is-pmi-or-private-mortgage-insurance/"
            >
              private mortgage insurance (PMI)
            </a>{" "}
            costs will be added to your monthly mortgage payment. As the costs
            of utilities can vary from county to county, we’ve included a
            utilities estimate that you can break down by service. If you’re
            thinking about buying a condo or into a community with a Homeowners
            Association (HOA), you can add HOA fees.
          </p>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            The only amounts we haven’t included are the money you’ll need to
            save for annual home maintenance/repairs or the costs of home
            improvements. To see how much home you can afford including these
            costs, take a look at the{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="/how-much-house-can-I-afford/"
            >
              Better home affordability calculator
            </a>
            .
          </p>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            Fun fact:{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="/content/how-to-calculate-property-tax-on-a-house/"
            >
              Property tax rates
            </a>{" "}
            are extremely localized, so two homes of roughly the same size and
            quality on either side of a municipal border could have very
            different tax rates. Buying in an area with a lower property tax
            rate may make it easier for you to afford a higher-priced home.
          </p>
          <h3 className="font-bold text-textPrimary leading-heading m-0 p-0 tracking-normal w-auto text-lg md:text-xl">
            Do you know your property tax rate?
          </h3>
          <p className="font-normal leading-body m-0 p-0 text-left text-textPrimary text-base">
            While exact property tax rates vary by county, it can be helpful to
            look at taxes on the state level to get an idea for taxes in your
            state. Here’s a helpful chart from{" "}
            <a
              className="font-normal underline focus:outline-interactivePrimary focus:outline-1 focus:outline-offset-[theme(spacing.2xs)] text-interactivePrimary"
              href="https://www.forbes.com/sites/andrewdepietro/2023/09/01/property-taxes-by-state-a-breakdown-of-the-highest-and-lowest-property-taxes-by-state"
            >
              Forbes
            </a>{" "}
            breaking down the Census Bureau’s 2021 American Community Survey
            5-year estimate:
          </p>
        </section>
        <section className="pb-6 m-auto max-w-screen-2xl px-6 md:px-14">
          <p className="text-xs text-gray-900 text-left">
            *See
            <a
              className="underline text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-1"
              href="/faq/rates/whats-the-fine-print-better-real-estate/"
            >
              Better Real Estate discount terms and conditions
            </a>
            .
          </p>
          <p className="text-xs text-gray-900 text-left mt-4">
            **The average lifetime savings estimate is based on a comparison of
            the Freddie Mac Primary Mortgage Market Survey’s (PMMS) 30-year
            fixed-rate mortgage product with Better Mortgage’s own offered rate
            for a comparable mortgage product between Jan ‘20 - Dec ‘20. PMMS is
            based on conventional, conforming fully-amortizing home purchase
            loans for borrowers with a loan-to-value of 80 percent and with
            excellent credit. Better Mortgage’s offered rate is based on pricing
            output for a 30-year fixed-rate mortgage product with a 30-day lock
            period for a single-family, owner-occupied residential property and
            a borrower with excellent (760 FICO) credit and a loan-to-value
            ratio of 80 percent. Individual savings could vary based on current
            market rates, property type, loan amount, loan-to-value, credit
            score, debt-to-income ratio, and other variables.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
