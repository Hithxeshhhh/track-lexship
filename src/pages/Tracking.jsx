import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import html2canvas from "html2canvas";
import logistics1 from "../assets/logistics1.png";
import logo from "../assets/lexship.png";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Input, InputGroup, Radio, RadioGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FaBellSlash, FaBoxOpen, FaExclamationTriangle, FaGlobeAmericas, FaGripLines, FaGripLinesVertical, FaPlane, FaPlaneDeparture, FaShippingFast, FaTruckLoading, FaWarehouse } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiArrowLeft, FiBell, FiCreditCard, FiDollarSign, FiGlobe, FiHeadphones, FiHelpCircle, FiSend, FiShare2, FiShoppingCart, FiUser } from "react-icons/fi";
import { FiAlertTriangle, FiTruck, FiX } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { HiOutlineChartBar } from "react-icons/hi";
import { RiCustomerService2Fill, RiFileLine, RiFilmLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Flex,
  Divider,
  Card,
  CardBody,
  Spinner,
  Icon,
  Circle,

  InputRightElement,
  Badge,
  IconButton,
  SimpleGrid,
  useDisclosure,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Progress,
  Tag,
  LinkBox,
  LinkOverlay,
  Stack,
  Link,
  Grid,
  GridItem,
  ModalFooter
} from "@chakra-ui/react";

import {
  FiSearch,
  FiPlus,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiMapPin,
  FiRefreshCw,
  FiCopy,
  FiChevronRight,
  FiFileText,
  FiHome,
  FiInfo,
  FiCalendar,
  FiGrid,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiTarget,
  FiShield,
  FiUsers,
  FiAirplay,
  FiDownload,
  
} from "react-icons/fi";

// Global styles for fonts
const Fonts = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Yanone+Kaffeesatz:wght@200..700&display=swap');
      
      @font-face {
        font-family: 'Mona Sans';
        src: url('https://assets.codepen.io/64/Mona-Sans.woff2') format('woff2 supports variations'),
             url('https://assets.codepen.io/64/Mona-Sans.woff2') format('woff2-variations');
        font-weight: 200 900;
        font-stretch: 75% 125%;
      }

      body, button, input, select, textarea {
        font-family: 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        font-weight: 700;
        font-stretch: 110%;
      }
      
      .header-font {
        font-family: 'Mona Sans', 'Fjalla One', sans-serif;
        font-weight: 800;
        font-stretch: 115%;
      }
      
      .subtitle-font {
        font-family: 'Mona Sans', 'Yanone Kaffeesatz', sans-serif;
        font-weight: 500;
        font-stretch: 105%;
      }
    `}
  />
);

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingNumbers, setTrackingNumbers] = useState([]);
  const [trackingDataMap, setTrackingDataMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMap, setErrorMap] = useState({});
  const [ratings, setRatings] = useState({});
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [viewMode, setViewMode] = useState("detailed");
  const [bulkInput, setBulkInput] = useState("");
  const [showTrackingSection, setShowTrackingSection] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [quickTrackData, setQuickTrackData] = useState(null);
  const [showQuickTrackDetails, setShowQuickTrackDetails] = useState(false);
  const [trackingMethod, setTrackingMethod] = useState("tracking");
  const [mobileNumber, setMobileNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [bulkTrackingNumbers, setBulkTrackingNumbers] = useState("");
  const [isFullScreenLoading, setIsFullScreenLoading] = useState(false);
  const [isQuickTrackLoading, setIsQuickTrackLoading] = useState(false);
  const [isCustomerIdLoading, setIsCustomerIdLoading] = useState(false);

  // Add ref for timeline container
  const timelineContainerRef = useRef(null);
  const firstTimelineEventRef = useRef(null);

  
  const { isOpen: isBulkModalOpen, onOpen: onBulkModalOpen, onClose: onBulkModalClose } = useDisclosure();
  const { isOpen: isContactModalOpen, onOpen: onContactModalOpen, onClose: onContactModalClose } = useDisclosure();
  const { isOpen: isTrackingNotificationModalOpen, onOpen: onTrackingNotificationModalOpen, onClose: onTrackingNotificationModalClose } = useDisclosure();
  const { isOpen: isRemoveAllModalOpen, onOpen: onRemoveAllModalOpen, onClose: onRemoveAllModalClose } = useDisclosure();



  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedEvents(prevState =>
      prevState.includes(value)
        ? prevState.filter(item => item !== value) // Deselect event
        : [...prevState, value] // Select event
    );
  };

  // Handle sending notification for selected events
  const handleSendNotification = () => {
    if (selectedEvents.length === 0) {
      alert("Please select at least one tracking event.");
      return;
    }

    const message = `Hi! I would like to receive notifications for: ${selectedEvents.join(", ")}.`;

    window.open(`https://wa.me/918448444097?text=${encodeURIComponent(message)}`, "_blank");
  };
  const toast = useToast();

  // Toast management to prevent duplicates
  const showToast = (config) => {
    // Create unique ID based on title and description to prevent duplicates
    const toastId = `${config.status}-${config.title}-${config.description}`.replace(/\s+/g, '-').toLowerCase();
    
    // Check if toast with same ID is already active
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        ...config,
        // Add responsive sizing
        containerStyle: {
          fontSize: { base: "12px", md: "14px" },
          maxWidth: { base: "280px", md: "400px" },
          padding: { base: "8px", md: "12px" }
        }
      });
    }
  };

  const handleTrackingButtonClick = () => {
    setShowTrackingSection(true);
    setActiveSection("tracking");
    
    // Scroll to tracking section
    setTimeout(() => {
      const trackingSection = document.getElementById("tracking-section");
      if (trackingSection) {
        trackingSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Function to switch to home section
  const handleHomeButtonClick = () => {
    setActiveSection("home");
    setShowTrackingSection(false);
  };

  // Animation options
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return { date: "", time: "" };
    
    try {
      // Ensure we have a valid date
      const date = new Date(timestamp);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", timestamp);
        return { date: "Date unavailable", time: "" };
      }
      
      // Format date: "27th Aug 2021"
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      const suffix = getDaySuffix(day);
      
      // Format time: "At 2:30 PM"
      const timeStr = date.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      
      return {
        date: `${day}${suffix} ${month} ${year}`,
        time: `At ${timeStr}`
      };
    } catch (err) {
      console.error("Error formatting date:", timestamp, err);
      return { date: "Date unavailable", time: "" };
    }
  };
  
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatCityName = (cityName) => {
    if (!cityName) return '';
    return cityName
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Convert country code to flag image URL
  const getCountryFlag = (countryCode) => {
    if (!countryCode) return null; // Return null for missing country code
    
    try {
      // Convert country code to lowercase for the API
      const code = countryCode.toLowerCase();
      return `https://flagcdn.com/w40/${code}.png`;
    } catch (err) {
      console.error('Error creating flag URL:', countryCode, err);
      return null;
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes("unsuccessful") && statusLower.includes("delivery")) {
      return FaExclamationTriangle;
    } else if (statusLower.includes("delivered")) {
      return FiCheckCircle;
    } else if (statusLower.includes("transit") || statusLower.includes("shipped")) {
      return TbTruckDelivery;
    } else if (statusLower.includes("processing") || statusLower.includes("preparing")) {
      return FaBoxOpen;
    } else if (statusLower.includes("warehouse") || statusLower.includes("facility")) {
      return FaWarehouse;
    } else if (statusLower.includes("loading")) {
      return FaTruckLoading;
    } else {
      return FiPackage;
    }
  };
  
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes("unsuccessful") && statusLower.includes("delivery")) {
      return "orange";
    } else if (statusLower.includes("delivered")) {
      return "green";
    } else if (statusLower.includes("transit")) {
      return "blue";
    } else if (statusLower.includes("processing")) {
      return "purple";
    } else if (statusLower.includes("delay") || statusLower.includes("failed")) {
      return "red";
    } else {
      return "gray";
    }
  };

  // Update the getLocationInfo function to better parse location information
  const getLocationInfo = (message) => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes("arrived at") || lowercaseMsg.includes("received at")) {
      const parts = message.split("at ");
      if (parts.length > 1) {
        return `at ${parts[1]}`;
      }
    } else if (lowercaseMsg.includes("from")) {
      const parts = message.split("from ");
      if (parts.length > 1) {
        return `From ${parts[1]}`;
      }
    } else if (lowercaseMsg.includes("hub") || lowercaseMsg.includes("facility") || lowercaseMsg.includes("center")) {
      // Extract facility name if present
      const words = message.split(" ");
      let facilityName = "";
      let foundKeyword = false;
      
      for (const word of words) {
        const lowerWord = word.toLowerCase();
        if (lowerWord.includes("hub") || lowerWord.includes("facility") || lowerWord.includes("center")) {
          foundKeyword = true;
          facilityName += " " + word;
        } else if (foundKeyword) {
          // Include words after facility keyword
          facilityName += " " + word;
        }
      }
      
      if (facilityName) {
        return facilityName.trim();
      }
    }
    
    return "";
  };
  
  // Update the getStatusTitle function to better extract status information
  const getStatusTitle = (message) => {
    // Check for common patterns
    if (message.includes("at ")) {
      const parts = message.split("at ");
      return parts[0].trim();
    } else if (message.includes("(")) {
      // Extract text before parentheses for titles like "LEX India Hub (Operations)"
      const parts = message.split("(");
      if (parts.length > 1) {
        return parts[0].trim();
      }
    }
    
    // Handle specific statuses
    const lowercaseMsg = message.toLowerCase();
    if (lowercaseMsg.includes("uplifted")) {
      return "Uplifted";
    } else if (lowercaseMsg.includes("customs cleared")) {
      return "Customs Cleared";
    } else if (lowercaseMsg.includes("customs")) {
      return "Sent for Customs Clearance";
    } else if (lowercaseMsg.includes("forwarded to")) {
      return "Forwarded to Destination";
    } else if (lowercaseMsg.includes("unsuccessful")) {
      return "Unsuccessful delivery attempt";
    }
    
    return message;
  };

  const getShipmentStatus = (results) => {
    if (!results || results.length === 0) return "Unknown";
    
    const latestStatus = results[results.length - 1].Message;
    if (latestStatus.toLowerCase().includes("delivered")) {
      return "Delivered";
    } else {
      return "In Transit";
    }
  };
  
  const getLatestUpdateDate = (results) => {
    if (!results || results.length === 0) return "";
    
    const latestTimestamp = results[results.length - 1].Timestamp;
    const { date } = formatDate(latestTimestamp);
    const weekday = new Date(latestTimestamp).toLocaleString('en-US', { weekday: 'long' });
    
    return `Last updated on ${date}, ${weekday}`;
  };
  
  // Modify the getProgressPercentage function to be more robust with validation
  const getProgressPercentage = (results) => {
    // Validate input data
    if (!results || !Array.isArray(results) || results.length === 0) {
      console.error("Invalid or empty results array:", results);
      return 0;
    }
    
    // Get the latest message with validation
    const latestEvent = results[results.length - 1];
    if (!latestEvent || !latestEvent.Message) {
      console.error("Invalid latest event:", latestEvent);
      return 0;
    }
    
    const latestStatus = latestEvent.Message.toLowerCase();
    console.log("Latest status message:", latestEvent.Message);
    
    // Create a precise map of status messages to percentages
    // Arranged in priority order (more specific patterns first)
    const statusMappings = [
      // Completed delivery (100%)
      { keywords: ["delivered", "delivery completed"], percentage: 100 },
      
      // Out for delivery / Delivery attempts (80-85%)
      { keywords: ["out for delivery","available at pick-up point","delivery attempt",
        "delivery delayed","shipment picked by carrier"], percentage: 85 },
      { keywords: ["unsuccessful delivery", "delivery attempt failed", "failed delivery","delivery failed"], percentage: 82 },
      
      // Near destination (70-75%)
      { keywords: ["arrived at destination"], percentage: 75 },
      { keywords: ["cleared destination", "destination customs cleared","available to pickup",
        "out of customs authorities","handled by local carrier","ready for collection","shipment injected into usps"], percentage: 79 },
      
      // International transit (60-68%)
      { keywords: ["forwarded to destination", "item forwarded to destination country"], percentage: 68 },
      { keywords: ["departed", "uplifted","under process - customs check",
        "waiting period expired / unpaid duties, could not be delivered",
        "held by destination customs","on hold - duties are due on this package",
        "in customs authorities","ready for collection","in customs authorities",
      "need to present documentation or additional information","item forwarded to the destination country",
      "item arrived to destination country"], percentage: 65 },
      { keywords: ["international hub"], percentage: 62 },
      
      // Customs (50-60%)
      { keywords: ["customs cleared"], percentage: 55 },
      { keywords: ["customs processing", "sent for customs clearance", "sent for customs",
        "customs clearance in progress","held at customs"], percentage: 40 },
      
      // Hub operations - Ensure these stay before customs processing
      { keywords: ["hub (operations)", "LEX India Hub (Operations)","in transit to lex hub"], percentage: 40 },
      { keywords: ["lex india hub", "received at lex","returned to origin"], percentage: 40 },
      { keywords: ["in transit", "transit"], percentage: 32 },
      
      // Pickup stages (25-40%)
      { keywords: ["picked up", "item picked up"], percentage: 40 },
      { keywords: ["out to p/u shipment", "pickup employee is out", "employee pickup"], percentage: 25 },
      { keywords: ["pickup scheduled", "pickup", "scheduled pickup"], percentage: 10 },
      
      // Early stages (10-20%)
      { keywords: ["ready", "prepared","pickup cancelled"], percentage: 20 },
      { keywords: ["processing", "preparing"], percentage: 20 },
      { keywords: ["received at", "received"], percentage: 15 },
      { keywords: ["created", "shipment created", "label", "information"], percentage: 10 },
      {keywords: ["shipment cancelled"], percentage: 5 }
    ];
    
    // Find the highest matching percentage based on keywords in the latest status
    let matchedPercentage = 0;
    
    for (const mapping of statusMappings) {
      if (mapping.keywords.some(keyword => latestStatus.includes(keyword))) {
        matchedPercentage = mapping.percentage;
        console.log(`Matched status '${mapping.keywords.find(k => latestStatus.includes(k))}' with percentage: ${matchedPercentage}%`);
        break; // Stop at the first match (highest priority match)
      }
    }
    
    // If no specific match was found, look for general patterns
    if (matchedPercentage === 0) {
      if (latestStatus.includes("hub") || latestStatus.includes("facility") || latestStatus.includes("center")) {
        matchedPercentage = 45;
      } else if (latestStatus.includes("received") || latestStatus.includes("accepted")) {
        matchedPercentage = 25;
      } else {
        matchedPercentage = 15; // Default for unrecognized status
      }
      console.log("Using general pattern match with percentage:", matchedPercentage);
    }
    
    console.log("Final calculated progress percentage:", matchedPercentage);
    return matchedPercentage;
  };

  const handleAddTracking = async () => {
    // Set loading state
    setIsQuickTrackLoading(true);

    try {
      if (!trackingNumber.trim()) {
        showToast({
          title: "Error",
          description: "Please enter a tracking number",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const newNumber = trackingNumber.trim();
      setTrackingNumber("");
      
      // Track the new number
      try {
        const data = await handleTrackAsync(newNumber);
        
        if (data?.result && data.result.length > 0) {
          // Update quick track display with results
          setQuickTrackData({
            number: newNumber,
            result: data.result.slice(-4), // last 4 events
            latest: data.result[data.result.length - 1],
            originInfo: data.originInfo,
            destinationInfo: data.destinationInfo,
            shipDate: data.shipDate
          });
          setShowQuickTrackDetails(true);
          
          // Update tracking list and select this number
          if (!trackingNumbers.includes(newNumber)) {
            setTrackingNumbers(prev => [...prev, newNumber]);
          }
          setSelectedTracking(newNumber);
          
          // Scroll to the quick track details section after a short delay to allow rendering
          setTimeout(() => {
            const quickTrackInfo = document.getElementById('quick-track-info');
            if (quickTrackInfo) {
              quickTrackInfo.scrollIntoView({ 
                behavior: "smooth", 
                block: "start",
                inline: "nearest"
              });
            }
          }, 100); // Wait for the animation to complete
        }
      } catch (err) {
        showToast({
          title: "Tracking Error",
          description: "Could not load tracking data for " + newNumber,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error during tracking:", err);
      }
    } finally {
      // Reset loading state
      setIsQuickTrackLoading(false);
    }
  };

  const handleBulkAdd = async () => {
    if (!bulkInput.trim()) {
      showToast({
        title: "Error",
        description: "Please enter tracking numbers",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Improved parsing logic for bulk input
    // First, normalize line breaks
    const normalizedInput = bulkInput.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Split by various delimiters and handle multiple formats
    let numbers = [];
    
    // Try to identify if the input is mainly comma-separated or newline-separated
    if (normalizedInput.includes(',')) {
      // Process as comma-separated
      numbers = normalizedInput.split(',');
    } else if (normalizedInput.includes('\n')) {
      // Process as newline-separated
      numbers = normalizedInput.split('\n');
    } else {
      // Process as space-separated
      numbers = normalizedInput.split(/\s+/);
    }
    
    // Now clean up each tracking number
    numbers = numbers
      .map(num => num.trim())
      .filter(num => num !== "")
      .map(num => {
        // Remove any non-alphanumeric characters except dashes and spaces
        const cleaned = num.replace(/[^a-zA-Z0-9\s\-]/g, '').trim();
        // Further cleanup if needed (you may adjust this based on your tracking number format)
        return cleaned;
      });
    
    // Remove duplicates both from the input and from existing numbers
    const uniqueNumbers = [...new Set(numbers)];
    const newNumbers = uniqueNumbers.filter(num => !trackingNumbers.includes(num));
    
    if (newNumbers.length === 0) {
      showToast({
        title: "Duplicates",
        description: "All tracking numbers are already in your list",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    console.log("Parsed tracking numbers:", newNumbers);
    
    // First update the tracking numbers list
    const updatedTrackingNumbers = [...trackingNumbers, ...newNumbers];
    setTrackingNumbers(updatedTrackingNumbers);
    setBulkInput("");
    onBulkModalClose();
    
    // Show full screen loader
    setIsFullScreenLoading(true);
    
    // Create a clean slate for loading the new data
    setSelectedTracking(null);
    
    // Process tracking data with a short delay
    setTimeout(async () => {
      try {
        // Track all numbers concurrently with a limit
        const batchSize = 5; // Process 5 at a time
        
        for (let i = 0; i < newNumbers.length; i += batchSize) {
          const batch = newNumbers.slice(i, i + batchSize);
          await Promise.all(batch.map(num => handleTrackAsync(num).catch(err => {
            console.error(`Error tracking ${num}:`, err);
          })));
        }
        
        // Set the selected tracking to the first number for detailed view
        if (newNumbers.length > 0) {
          setSelectedTracking(newNumbers[0]);
        }
        
      } catch (err) {
        console.error("Error during bulk tracking:", err);
      } finally {
        // Hide loader and show tracking section
        setIsFullScreenLoading(false);
        
        // Set active section to show bulk results
        setActiveSection("bulk-results");
        
        showToast({
          title: "Tracking numbers added",
          description: `Added ${newNumbers.length} new tracking numbers`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }, 800);
  };

  // Function to fetch AWB numbers by customer ID
  const handleCustomerIdTracking = async () => {
    if (!orderId.trim()) {
      showToast({
        title: "Error",
        description: "Please enter a customer ID",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsCustomerIdLoading(true);

    try {
      console.log('Making API call to fetch customer shipments for ID:', orderId.trim());
      
      // Get token from environment variable (same as tracking API)
      const token = import.meta.env.VITE_TRACK_TOKEN;
      
      if (!token) {
        throw new Error("Authentication token not found in environment variables");
      }
      
      const response = await fetch(import.meta.env.VITE_TRACK_BASED_ON_CUSTOMER_ID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          CustId: orderId.trim()
        })
      });

      console.log('API response status:', response.status);
      console.log('API response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      // Try to parse JSON directly - some servers don't set correct content-type headers
      let data;
      try {
        data = await response.json();
        console.log('API response data:', data);
      } catch (jsonError) {
        // If JSON parsing fails, get the raw text to see what we actually received
        const responseText = await response.text();
        console.error('Failed to parse JSON response:', responseText);
        throw new Error('Server returned invalid JSON response.');
      }
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        showToast({
          title: "No Results",
          description: "No shipments found for this customer ID",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Extract and filter AWB numbers from the response
      const awbNumbers = data
        .map(item => item.full_awb_number)
        .filter(awb => {
          // Filter out null, undefined, or empty values
          if (!awb || awb.trim() === '') return false;
          
          // Filter out error responses (JSON strings containing error messages)
          if (awb.includes('"Status":"fail"') || 
              awb.includes('"ErrorMsg"') || 
              awb.includes('"AWB_Number":null') ||
              awb.startsWith('{') || 
              awb.includes('Error') ||
              awb.includes('error') ||
              awb.includes('fail')) {
            console.log('Filtering out invalid AWB:', awb);
            return false;
          }
          
          return true;
        });
      
      console.log('Filtered AWB numbers:', awbNumbers);
      
      if (awbNumbers.length === 0) {
        showToast({
          title: "No Valid AWB Numbers",
          description: "No valid AWB numbers found for this customer ID. All entries contained errors.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Remove duplicates from existing tracking numbers
      const newNumbers = awbNumbers.filter(num => !trackingNumbers.includes(num));
      
      if (newNumbers.length === 0) {
        showToast({
          title: "Already Tracked",
          description: "All AWB numbers for this customer ID are already being tracked",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Clear the customer ID input
      setOrderId("");

      // Add the new numbers to tracking list
      const updatedTrackingNumbers = [...trackingNumbers, ...newNumbers];
      setTrackingNumbers(updatedTrackingNumbers);
      
      // Show full screen loader
      setIsFullScreenLoading(true);
      setIsCustomerIdLoading(false);
      
      // Create a clean slate for loading the new data
      setSelectedTracking(null);
      
      // Process tracking data with a short delay
      setTimeout(async () => {
        try {
          // Track all numbers concurrently with a limit
          const batchSize = 5; // Process 5 at a time
          
          for (let i = 0; i < newNumbers.length; i += batchSize) {
            const batch = newNumbers.slice(i, i + batchSize);
            await Promise.all(batch.map(num => handleTrackAsync(num).catch(err => {
              console.error(`Error tracking ${num}:`, err);
            })));
          }
          
          // Set the selected tracking to the first number for detailed view
          if (newNumbers.length > 0) {
            setSelectedTracking(newNumbers[0]);
          }
          
        } catch (err) {
          console.error("Error during customer ID bulk tracking:", err);
        } finally {
          // Hide loader and show tracking section
          setIsFullScreenLoading(false);
          
          // Set active section to show bulk results
          setActiveSection("bulk-results");
          
          showToast({
            title: "Customer shipments loaded",
            description: `Found and loaded ${newNumbers.length} shipments for customer ID ${orderId}`,
            status: "success",
            duration: 4000,
            isClosable: true,
          });
        }
      }, 800);

    } catch (error) {
      console.error('Error fetching customer shipments:', error);
      
      let errorMessage = "Failed to fetch shipments for this customer ID. Please try again.";
      
      if (error.message.includes('non-JSON response')) {
        errorMessage = "API endpoint is not responding with valid data. Please contact support.";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = `Server error: ${error.message}. Please try again later.`;
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      }
      
      showToast({
        title: "API Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCustomerIdLoading(false);
    }
  };

  // Create an async version of handleTrack that returns a promise
  const handleTrackAsync = async (number) => {
    return new Promise((resolve, reject) => {
      const numberToTrack = number;
      
      if (!numberToTrack) {
        reject(new Error("No tracking number provided"));
        return;
      }
      
      // Clear previous error for this tracking number
      setErrorMap(prev => ({
        ...prev,
        [numberToTrack]: null
      }));
      
      try {
        // Get token from environment variable
        const token = import.meta.env.VITE_TRACK_TOKEN;
        const lex_tracking_api = import.meta.env.VITE_LEX_TRACKING_API;
        
        if (!token) {
          reject(new Error("Authentication token not found in environment variables"));
          return;
        }
        
        axios.post(
          lex_tracking_api,
          {
            "awb_numbers": [
              {
                "parcel_id": numberToTrack
              }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        ).then(response => {
          if (response.data && response.data.length > 0) {
            const trackingItem = response.data[0];
            
            if (trackingItem && trackingItem.TrackPoints && trackingItem.TrackPoints.AWBHistory) {
              // Transform the data to match our expected format
              const transformedEvents = trackingItem.TrackPoints.AWBHistory.map(event => {
                // Parse date properly - format is DD/MM/YYYY
                const [day, month, year] = event.ActionDate.split('/');
                // Create a proper date object
                const dateObj = new Date(`${year}-${month}-${day}T${event.ActionTime}`);
                // Format as ISO string
                const timestamp = dateObj.toISOString();
                
                return {
                  Message: event.Status,
                  Timestamp: timestamp
                };
              });
              
              // Sort events chronologically (oldest first - reverse the order since API gives newest first)
              transformedEvents.reverse();
              
              // Create transformed data structure
              const transformedData = {
                result: transformedEvents,
                originInfo: {
                  country: trackingItem.Origin,
                  city: trackingItem.Origin_City
                },
                destinationInfo: {
                  country: trackingItem.Destination,
                  city: trackingItem.Destination_City
                },
                
                shipDate: trackingItem.ShipDate
              };
              
              // Update tracking data
              setTrackingDataMap(prev => {
                const updatedMap = {
                  ...prev,
                  [numberToTrack]: transformedData
                };
                return updatedMap;
              });
              
              setLoading(false);
              resolve(transformedData);
            } else {
              setErrorMap(prev => ({
                ...prev,
                [numberToTrack]: "No tracking history found for this number"
              }));
              
              setLoading(false);
              reject(new Error("No tracking history found for this number"));
            }
          } else {
            setErrorMap(prev => ({
              ...prev,
              [numberToTrack]: "No data received from tracking API"
            }));
            
            setLoading(false);
            reject(new Error("No data received from tracking API"));
          }
        }).catch(err => {
          setErrorMap(prev => ({
            ...prev,
            [numberToTrack]: err.message || "An error occurred while tracking the shipment"
          }));
          
          setLoading(false);
          reject(err);
        });
      } catch (err) {
        setErrorMap(prev => ({
          ...prev,
          [numberToTrack]: err.message || "An error occurred while tracking the shipment"
        }));
        
        setLoading(false);
        reject(err);
      }
    });
  };

  const handleRemoveTracking = (number) => {
    // Create the new tracking numbers array first
    const newTrackingNumbers = trackingNumbers.filter(num => num !== number);
    setTrackingNumbers(newTrackingNumbers);
    
    // Remove data for this tracking number
    const newDataMap = { ...trackingDataMap };
    delete newDataMap[number];
    setTrackingDataMap(newDataMap);
    
    const newErrorMap = { ...errorMap };
    delete newErrorMap[number];
    setErrorMap(newErrorMap);
    
    // Update selected tracking if needed
    if (selectedTracking === number) {
      // Select another tracking if available, otherwise set to null
      setSelectedTracking(newTrackingNumbers.length > 0 ? newTrackingNumbers[0] : null);
    }
    
    // Hide tracking section if no numbers left
    if (newTrackingNumbers.length === 0) {
      setShowTrackingSection(false);
      setActiveSection("home");
    }
    
    // Remove the toast notification
    // toast({
    //   title: "Removed",
    //   description: `Tracking number ${number} removed`,
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    // });
  };

  const handleTrack = async (number = null) => {
    const numberToTrack = number || selectedTracking || trackingNumbers[0];
    
    if (!numberToTrack) {
      showToast({
        title: "Error",
        description: "No tracking number selected",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    
    // Clear previous error for this tracking number
    setErrorMap(prev => ({
      ...prev,
      [numberToTrack]: null
    }));
    
    try {
      // Get token from environment variable
      const token = import.meta.env.VITE_TRACK_TOKEN;
              const lex_tracking_api = import.meta.env.VITE_LEX_TRACKING_API;
      if (!token) {
        throw new Error("Authentication token not found in environment variables");
      }
      
      const response = await axios.post(
        lex_tracking_api,
        {
          "awb_numbers": [
            {
              "parcel_id": numberToTrack
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Debug: Log the full API response
      console.log("Full tracking API response:", response.data);

      if (response.data && response.data.length > 0) {
        const trackingItem = response.data[0];
        
        if (trackingItem && trackingItem.TrackPoints && trackingItem.TrackPoints.AWBHistory) {
          // Transform the data to match our expected format
          const transformedEvents = trackingItem.TrackPoints.AWBHistory.map(event => {
            // Parse date properly - format is DD/MM/YYYY
            const [day, month, year] = event.ActionDate.split('/');
            // Create a proper date object
            const dateObj = new Date(`${year}-${month}-${day}T${event.ActionTime}`);
            // Format as ISO string
            const timestamp = dateObj.toISOString();
            
            return {
              Message: event.Status,
              Timestamp: timestamp
            };
          });
          
          // Sort events chronologically (oldest first - reverse since API gives newest first)
          transformedEvents.reverse();
          
          // Debug: Log the transformed events
          console.log("Tracking events after transformation:", transformedEvents);
          console.log("Number of tracking events:", transformedEvents.length);
          
          // Create transformed data structure
          const transformedData = {
            result: transformedEvents,
            originInfo: {
              country: trackingItem.Origin,
              city: trackingItem.Origin_City
            },
            destinationInfo: {
              country: trackingItem.Destination,
              city: trackingItem.Destination_City
            },
            shipDate: trackingItem.ShipDate
          };
          
          // Update data with animation trigger
          setTrackingDataMap(prev => {
            // Force animation restart by temporarily removing data
            if (prev[numberToTrack]) {
              return {
                ...prev,
                [numberToTrack]: null
              };
            }
            return prev;
          });
          
          // Short delay to ensure animation restarts
          setTimeout(() => {
            setTrackingDataMap(prev => {
              const updatedMap = {
                ...prev,
                [numberToTrack]: transformedData
              };
              // Debug: Log what's being stored in state
              console.log("Updated tracking data for", numberToTrack, ":", 
                updatedMap[numberToTrack].result ? updatedMap[numberToTrack].result.length : 0, "events");
              return updatedMap;
            });
            
            // Select this tracking if none is selected
            if (!selectedTracking) {
              setSelectedTracking(numberToTrack);
            }
          }, 50);
          
        } else {
          setErrorMap(prev => ({
            ...prev,
            [numberToTrack]: "No tracking history found for this number"
          }));
          
          showToast({
            title: "Tracking Error",
            description: `Error tracking ${numberToTrack}: No tracking history found`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        setErrorMap(prev => ({
          ...prev,
          [numberToTrack]: "No data received from tracking API"
        }));
      }
    } catch (err) {
      setErrorMap(prev => ({
        ...prev,
        [numberToTrack]: err.message || "An error occurred while tracking the shipment"
      }));
      
      showToast({
        title: "Error",
        description: `Failed to track ${numberToTrack}: ${err.message || "Unknown error"}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrackAll = () => {
    trackingNumbers.forEach(number => {
      handleTrack(number);
    });
    
    showToast({
      title: "Tracking All",
      description: `Tracking ${trackingNumbers.length} shipments`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (trackingMethod === "cust") {
        handleCustomerIdTracking();
      } else {
        handleAddTracking();
      }
    }
  };
  
  // Function to copy tracking number to clipboard
  const handleCopyTracking = (number) => {
    navigator.clipboard.writeText(number).then(() => {
      showToast({
        title: "Copied!",
        description: `Tracking number ${number} copied to clipboard`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }).catch(err => {
      showToast({
        title: "Copy failed",
        description: "Could not copy tracking number",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
  };
  
  // Set rating for a specific tracking number
  const handleSetRating = (trackingNum, rating) => {
    setRatings(prev => ({
      ...prev,
      [trackingNum]: rating
    }));
    
    showToast({
      title: "Thanks for your feedback!",
      description: "Your rating has been recorded",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Calculate shipment stats
  const calculateStats = () => {
    let delivered = 0;
    let inTransit = 0;
    let processing = 0;
    let unknown = 0;
    let totalDays = 0;
    let totalBusinessDays = 0;
    let shipmentCount = 0;
    
    trackingNumbers.forEach(number => {
      const data = trackingDataMap[number];
      if (!data || !data.result || data.result.length === 0) {
        unknown++;
        return;
      }
      
      const status = getShipmentStatus(data.result);
      if (status === "Delivered") {
        delivered++;
        
        // Calculate days for completed shipments
        if (data.result.length >= 2) {
          const deliveryInfo = calculateDeliveryDays(data.result);
          totalDays += deliveryInfo.days;
          totalBusinessDays += deliveryInfo.businessDays;
          shipmentCount++;
        }
      } else if (status === "In Transit") {
        inTransit++;
      } else {
        processing++;
      }
    });
    
    // Calculate average delivery time
    const avgDeliveryDays = shipmentCount > 0 ? Math.round(totalDays / shipmentCount) : 0;
    const avgBusinessDays = shipmentCount > 0 ? Math.round(totalBusinessDays / shipmentCount) : 0;
    
    return { 
      delivered, 
      inTransit, 
      processing, 
      unknown, 
      total: trackingNumbers.length,
      avgDeliveryDays,
      avgBusinessDays,
      totalDays,
      totalBusinessDays
    };
  };

  const calculateDeliveryDays = (events) => {
    if (!events || events.length < 2) return { days: 0, isComplete: false, businessDays: 0 };
    
    const firstEventDate = new Date(events[0].Timestamp);
    const lastEventDate = new Date(events[events.length - 1].Timestamp);
    const isDelivered = events[events.length - 1].Message.toLowerCase().includes("delivered");
    
    const diffTime = Math.abs(lastEventDate - firstEventDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate business days (excluding weekends)
    let businessDays = 0;
    const currentDate = new Date(firstEventDate);
    
    // Set time to midnight to avoid time comparison issues
    currentDate.setHours(0, 0, 0, 0);
    const endDate = new Date(lastEventDate);
    endDate.setHours(0, 0, 0, 0);
    
    // Loop through each day and count only if it's not weekend
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      // Skip Saturday (6) and Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return { 
      days: diffDays, 
      businessDays: businessDays,
      isComplete: isDelivered,
      startDate: firstEventDate,
      endDate: lastEventDate
    };
  };

  // PDF Generation Function for Tracking History
  const generateTrackingHistoryPDF = (trackingNumber) => {
    const data = trackingDataMap[trackingNumber];
    if (!data || !data.result || data.result.length === 0) {
      showToast({
        title: "No Data",
        description: "No tracking history available to export",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create PDF content as HTML
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Tracking History - ${trackingNumber}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 10px;
            background-color: #f8f9fa;
            color: #333;
            font-size: 12px;
          }
          .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            padding: 15px;
            border-radius: 6px;
            box-shadow: 0 1px 5px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 2px solid #3182ce;
            padding-bottom: 10px;
          }
          .logo {
            font-size: 18px;
            font-weight: bold;
            color: #3182ce;
            margin-bottom: 5px;
          }
          .tracking-number {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 5px;
          }
          .date-generated {
            font-size: 10px;
            color: #718096;
          }
          .shipment-info {
            background: #f7fafc;
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 15px;
            border-left: 3px solid #3182ce;
          }
          .shipment-info h3 {
            margin: 0 0 8px 0;
            font-size: 14px;
            color: #2d3748;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            font-size: 11px;
          }
          .info-label {
            font-weight: bold;
            color: #4a5568;
          }
          .info-value {
            color: #2d3748;
            text-align: right;
            max-width: 60%;
          }
          .timeline {
            margin-top: 10px;
          }
          .timeline-header {
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
          }
          .timeline-item {
            display: flex;
            margin-bottom: 8px;
            padding: 8px;
            background: #f7fafc;
            border-radius: 4px;
            border-left: 2px solid #3182ce;
            font-size: 10px;
          }
          .timeline-date {
            min-width: 80px;
            font-weight: bold;
            color: #4a5568;
            margin-right: 10px;
            font-size: 9px;
          }
          .timeline-content {
            flex: 1;
          }
          .timeline-message {
            font-weight: bold;
            color: #2d3748;
            margin-bottom: 2px;
            font-size: 10px;
            line-height: 1.2;
          }
          .timeline-time {
            font-size: 8px;
            color: #718096;
          }
          .status-delivered {
            border-left-color: #38a169 !important;
          }
          .status-transit {
            border-left-color: #3182ce !important;
          }
          .status-processing {
            border-left-color: #805ad5 !important;
          }
          .footer {
            margin-top: 15px;
            text-align: center;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
            font-size: 8px;
            color: #718096;
          }
          .footer p {
            margin: 2px 0;
          }
          
          /* Print-specific styles */
          @media print {
            body {
              background: white !important;
              padding: 5px !important;
            }
            .container {
              box-shadow: none !important;
              padding: 10px !important;
            }
            .timeline-item {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">Lexship Tracking Report</div>
            <div class="tracking-number">Tracking Number: ${trackingNumber}</div>
            <div class="date-generated">Generated on ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>

          <div class="shipment-info">
            <h3>Shipment Information</h3>
            <div class="info-row">
              <span class="info-label">Current Status:</span>
              <span class="info-value">${data.result[data.result.length - 1].Message}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Updated:</span>
              <span class="info-value">${formatDate(data.result[data.result.length - 1].Timestamp).date} ${formatDate(data.result[data.result.length - 1].Timestamp).time}</span>
            </div>
            ${data.originInfo && data.destinationInfo ? `
            <div class="info-row">
              <span class="info-label">Route:</span>
              <span class="info-value">${formatCityName(data.originInfo.city)}, ${data.originInfo.country} → ${formatCityName(data.destinationInfo.city)}, ${data.destinationInfo.country}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="info-label">Total Events:</span>
              <span class="info-value">${data.result.length}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Delivery Time:</span>
              <span class="info-value">${calculateDeliveryDays(data.result).businessDays} business days</span>
            </div>
          </div>

          <div class="timeline">
            <div class="timeline-header">Tracking History (${data.result.length} Events)</div>
            ${data.result.slice().reverse().map((event, index) => {
              const { date, time } = formatDate(event.Timestamp);
              const statusColor = getStatusColor(event.Message);
              const statusClass = statusColor === 'green' ? 'status-delivered' : 
                                 statusColor === 'blue' ? 'status-transit' : 'status-processing';
              return `
                <div class="timeline-item ${statusClass}">
                  <div class="timeline-date">${date}</div>
                  <div class="timeline-content">
                    <div class="timeline-message">${event.Message}</div>
                    <div class="timeline-time">${time}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="footer">
            <p>This tracking report was generated by Lexship Tracking System</p>
            <p>For support, contact: customerservice@lexship.com | +91 8448444097</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = function() {
      printWindow.print();
      
      // Close the window after printing (optional)
      printWindow.onafterprint = function() {
        printWindow.close();
      };
    };

    showToast({
      title: "PDF Generated",
      description: "Tracking history PDF is ready for download",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (selectedTracking) {
      console.log("Selected tracking effect triggered for:", selectedTracking);
      
      // Check if we actually have the data for this tracking number
      if (!trackingDataMap[selectedTracking] || 
          !trackingDataMap[selectedTracking].result || 
          trackingDataMap[selectedTracking].result.length === 0) {
        
        console.log("No data found for tracking number, loading now:", selectedTracking);
        handleTrack(selectedTracking);
      } else {
        // Force re-calculation of progress
        const progress = getProgressPercentage(trackingDataMap[selectedTracking].result);
        console.log("Current tracking progress:", progress, "for tracking:", selectedTracking);
        
        // For mobile view - scroll to latest update in tracking timeline
        if (window.innerWidth < 768) {
          setTimeout(() => {
            if (firstTimelineEventRef.current) {
              firstTimelineEventRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (timelineContainerRef.current) {
              timelineContainerRef.current.scrollTop = 0; // Fallback: scroll to top
            }
          }, 800); // Wait for animations to complete
        }
      }
    }
  }, [selectedTracking]);


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


  
  

  return (
    <Box bg="gray.50" minH="100vh">
      <Fonts />

      {/* Full Screen Loader */}
      {isFullScreenLoading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.7)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          backdropFilter="blur(5px)"
        >
          <Box 
            bg="white" 
            p={{ base: 4, md: 8 }} 
            borderRadius="xl" 
            shadow="2xl" 
            textAlign="center"
            maxW={{ base: "300px", md: "400px" }}
            w="90%"
            position="relative"
            overflow="hidden"
          >
            <Box 
              position="absolute" 
              top={{ base: "-30px", md: "-50px" }} 
              right={{ base: "-30px", md: "-50px" }} 
              bg="blue.50" 
              w={{ base: "60px", md: "100px" }} 
              h={{ base: "60px", md: "100px" }} 
              borderRadius="full" 
              opacity="0.5"
            />
            <Box 
              position="absolute" 
              bottom={{ base: "-20px", md: "-30px" }} 
              left={{ base: "-20px", md: "-30px" }} 
              bg="purple.50" 
              w={{ base: "50px", md: "80px" }} 
              h={{ base: "50px", md: "80px" }} 
              borderRadius="full" 
              opacity="0.5"
            />
            
            <VStack spacing={{ base: 3, md: 6 }}>
              <Box position="relative">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size={{ base: "lg", md: "xl" }}
                />
                <Circle
                  position="absolute"
                  top="45%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  size={{ base: "28px", md: "40px" }}
                  bg="white"
                  shadow="md"
                >
                  <Icon as={FiPackage} color="blue.500" boxSize={{ base: 3, md: 5 }} />
                </Circle>
              </Box>
              
              <VStack spacing={{ base: 0.5, md: 1 }}>
                <Heading size={{ base: "sm", md: "md" }} color="gray.800" className="header-font">
                  Processing Shipments
                </Heading>
                <Text color="gray.500" fontSize={{ base: "xs", md: "md" }}>
                  Loading tracking data for your packages...
                </Text>
              </VStack>
              
              <Progress 
                hasStripe 
                isAnimated 
                size="sm" 
                w="full" 
                colorScheme="blue" 
                borderRadius="full"
                value={80}
              />
            </VStack>
          </Box>
        </Box>
      )}

     {/* Enhanced Notification System */}
     <Box 
        position="relative" 
        bg="gray.100" 
        borderBottom="1px" 
        borderColor="gray.200"
        
      >
        {/* <AlertNotificationSystem /> */}
      </Box>
      {/* Header */}
      <Box bg="white" py={3} borderBottom="1px" borderColor="gray.200" position="sticky" top="0" zIndex="10">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <HStack spacing={6}>
              <Flex align="center">
                <a href="https://www.lexship.com" target="_blank"><Image src={logo} alt="LexShip Logo" height="36px" /></a>
              </Flex>
              {/* header links */}
              <HStack spacing={6} display={{ base: "none", md: "flex" }}>
                <Link 
                  fontWeight={activeSection === "home" ? "semibold" : "normal"} 
                  color={activeSection === "home" ? "blue.500" : "gray.700"}
                  onClick={() => window.location.reload()}
                  _hover={{ color: "blue.500" }}
                  cursor="pointer"
                >
                  Home
                </Link>
                
                
                
              </HStack>
            </HStack>
            <HStack>
            {/* Send notification modal */}
            {/* <Button 
                colorScheme="blue" 
                variant="outline" 
                bgColor="orange.400"
                color="white"
                size="sm" 
                _hover={{ bg: "white" , color: "black" }}
                _active={{ bg: "white" , color: "black" }}
                onClick={onTrackingNotificationModalOpen}
                display={{ base: "none", md: "inline-flex" }}
              >
                Send notification <FiBell className="ml-2" fontSize="large" />
              </Button> */}
              
              <IconButton 
                color="black"
                icon={viewMode === "detailed" ? <FiGrid /> : <FaGripLines/>}
                aria-label="Toggle view mode"
                onClick={() => setViewMode(viewMode === "detailed" ? "compact" : "detailed")}
                variant="ghost"
                colorScheme="gray"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>
      
      {/* Hero Section */}
      {activeSection === "home" && (
        
        <Box 
          bg="linear-gradient(135deg, #1A365D 0%, #3182CE 100%)" 
          color="white"
          py={{ base: 16, md: 28 }}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative elements */}
          <Box 
            position="absolute" 
            right="-5%" 
            top="10%" 
            borderRadius="full"
            bg="whiteAlpha.100" 
            w="40%" 
            h="40%"
            filter="blur(60px)"
          />
          <Box 
            position="absolute"
            left="10%" 
            bottom="-10%" 
            borderRadius="full"
            bg="whiteAlpha.200" 
            w="30%" 
            h="60%"
            filter="blur(80px)"
          />
          
          <Container maxW="container.xl" position="relative">
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={10}>
              <GridItem>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Heading 
                    size="2xl" 
                    mb={6} 
                    lineHeight="1.2" 
                    className="header-font"
                    fontWeight="extrabold"
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  >
                    Your Shipments Delivered with <br /><Link  color="yellow.300" fontWeight="extrabold"> Purpose & Precision</Link>
                  </Heading>
                  <Text 
                    fontSize={{ base: "lg", md: "xl" }} 
                    fontWeight="medium" 
                    mb={8} 
                    maxW="90%"
                    className="subtitle-font"
                  >
                    Experience seamless logistics solutions with real-time tracking and global reach. We deliver more than packages – we deliver promises.
                  </Text>
                  
                  <HStack spacing={4}>
                    <Button 
                      size="lg" 
                      colorScheme="blue" 
                      onClick={handleTrackingButtonClick} 
                      rightIcon={<FiArrowRight />}
                      fontWeight="bold"
                      bg="white"
                      color="blue.600"
                      _hover={{ bg: "blue.50" }}
                      px={8}
                      boxShadow="md"
                      display={{ base: "none", md: "flex" }}
                    >
                      Track Now
                    </Button>
                    
                  </HStack>
                </motion.div>
              </GridItem>
             {/* quick track block */}
<GridItem display={{ base: "block", lg: "block" }}>
  
  {/* Decorative elements */}
  <Box position="absolute" bottom="-165px" right="-125px" zIndex="1" pointerEvents="none" display={{ base: "none", lg: "block" }}>
    <Image src={logistics1} alt="Truck and Boxes Illustration" maxW="320px" />
  </Box>      
         
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <Box
      bg="white"
      borderRadius="lg"
      p={{ base: 3, md: 5 }}
      boxShadow="md"
      color="gray.700"
      position="relative"
      overflow="hidden"
      maxW="600px"
      mx="auto"
    >
      <Box
        position="absolute"
        top="-30px"
        right="-30px"
        bg="blue.50"
        borderRadius="full"
        w="120px"
        h="120px"
        zIndex="0"
      />
      
      <Heading size={{ base: "sm", md: "md" }} mb={{ base: 2, md: 4 }} position="relative" zIndex="1" className="header-font" textAlign="center">
        Track Your Shipment
      </Heading>
      
      {/* Track By Tabs */}
      <Tabs 
        variant="enclosed" 
        colorScheme="blue" 
        size={{ base: "xs", md: "sm" }} 
        isFitted 
        mb={{ base: 2, md: 4 }} 
        index={['tracking', 'cust', 'bulk'].indexOf(trackingMethod)}
        onChange={(index) => setTrackingMethod(['tracking', 'cust', 'bulk'][index])}
        className="tracking-tabs"
      >
        <TabList>
          <Tab fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} py={{ base: 1, md: 2 }}>Tracking Number</Tab>
          
          <Tab fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} py={{ base: 1, md: 2 }}>Customer Id</Tab>
          <Tab fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} py={{ base: 1, md: 2 }}>Bulk Track</Tab>
        </TabList>
        
        <TabPanels>
          {/* Tracking Number Tab */}
          <TabPanel px={0} pt={{ base: 2, md: 4 }}>
            <VStack spacing={{ base: 2, md: 3 }} align="stretch">
              <InputGroup size={{ base: "sm", md: "md" }}>
                <Input 
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  borderRadius="md"
                  bg="white"
                  borderColor="gray.300"
                  _placeholder={{ 
                    color: "gray.500" 
                  }}
                  _focus={{ 
                    borderColor: "blue.400", 
                    boxShadow: "0 0 0 1px blue.400" 
                  }}
                />
              </InputGroup>
              
              <Button
                colorScheme="blue"
                size="md"
                w="full"
                onClick={handleAddTracking}
                isLoading={isQuickTrackLoading}
                loadingText="Tracking..."
              >
                Track Package
              </Button>
            </VStack>
          </TabPanel>
          
          
          
          {/* Customer ID Tab */}
          <TabPanel px={0} pt={{ base: 2, md: 4 }}>
            <VStack spacing={{ base: 2, md: 3 }} align="stretch">
              <InputGroup size={{ base: "sm", md: "md" }}>
                <Input
                  placeholder="Enter your Order Id"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  borderRadius="md"
                  bg="white"
                  borderColor="gray.300"
                  _placeholder={{ 
                    color: "gray.500" 
                  }}
                  _focus={{ 
                    borderColor: "blue.400", 
                    boxShadow: "0 0 0 1px blue.400" 
                  }}
                />
              </InputGroup>
              
              <Button
                colorScheme="blue"
                size="md"
                w="full"
                onClick={handleCustomerIdTracking}
                isLoading={isCustomerIdLoading}
                loadingText="Loading shipments..."
              >
                Track Customer Shipments
              </Button>
            </VStack>
          </TabPanel>
          
          {/* Bulk Track Tab */}
          <TabPanel px={0} pt={{ base: 2, md: 4 }}>
            <VStack spacing={{ base: 2, md: 3 }} align="stretch">
              <Textarea
                placeholder="Enter multiple tracking numbers (one per line or comma-separated)"
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                borderRadius="md"
                bg="white"
                borderColor="gray.300"
                _focus={{ 
                  borderColor: "blue.400", 
                  boxShadow: "0 0 0 1px blue.400" 
                }}
                _placeholder={{ 
                  color: "gray.500" 
                }}
                rows={4}
              />
              
              <Button
                colorScheme="blue"
                size="md"
                w="full"
                onClick={handleBulkAdd}
                isDisabled={!bulkInput.trim()}
                isLoading={isFullScreenLoading}
                loadingText="Processing..."
              >
                Track now
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Help Text */}
      <Box mt={{ base: 1, md: 2 }} mb={{ base: 2, md: 4 }} px={1}>
        <Text fontWeight="bold" fontSize={{ base: "xs", md: "md" }} color="blue.800">Can't Find Your Order Details?</Text>
        <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.600">
          Contact our customer care or click on the contact us
        </Text>
      </Box>

      {/* Quick Track Result Display */}
      <AnimatePresence mode="wait">
        {showQuickTrackDetails && quickTrackData && (
          <motion.div
            key={quickTrackData.number}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
                          <Box 
                mt={{ base: 2, md: 4 }} 
                p={{ base: 2, md: 4 }} 
                border="1px solid" 
                borderColor="gray.200" 
                borderRadius="md" 
                bg={
                  getStatusColor(quickTrackData.latest.Message) === "green" 
                  ? "#38A169" 
                  : "#3182CE"
                }
                as={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                id="quick-track-info"
              >
                <Flex justify="space-between" align="flex-start">
                  <Box color="white">
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="small" mb={{ base: 0.5, md: 1 }}>
                      Tracking ID: {quickTrackData.number}
                    </Text>
                    <Heading size={{ base: "sm", md: "md" }} fontWeight="bold" mb={{ base: 1, md: 2 }} fontSize={{ base: "md", md: "lg" }}>
                      {quickTrackData.latest.Message}
                    </Heading>
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="small">
                      Last updated on {formatDate(quickTrackData.latest.Timestamp).date}
                    </Text>
                    
                  {quickTrackData.originInfo && quickTrackData.destinationInfo && (
                      <Box mt={{ base: 1.5, md: 3 }}>
                        <Flex
                          color="white" 
                          borderRadius="md" 
                          px={{ base: 2, md: 3 }} 
                          py={{ base: 1, md: 2 }} 
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="medium" 
                          alignItems="center"
                          justifyContent="flex-start"
                          boxShadow={{ base: "md", md: "lg" }}
                          mx={0}
                          maxW="fit-content"
                        >
                          <Flex align="center" mr={{ base: 1, md: 2 }}>
                            {getCountryFlag(quickTrackData.originInfo.country) ? (
                              <Image src={getCountryFlag(quickTrackData.originInfo.country)} alt={quickTrackData.originInfo.country} height={{ base: "14px", md: "20px" }} mr={{ base: 1, md: 2 }} />
                            ) : (
                              <Icon as={FiGlobe} mr={{ base: 1, md: 2 }} boxSize={{ base: "12px", md: "16px" }} />
                            )}
                            <Text fontSize={{ base: "2xs", md: "xs" }}>{formatCityName(quickTrackData.originInfo.city)}, {quickTrackData.originInfo.country}</Text>
                          </Flex>
                          
                          <Icon as={FiArrowRight} boxSize={{ base: 3, md: 4 }} mx={{ base: 1, md: 2 }} />
                          
                          <Flex align="center">
                            {getCountryFlag(quickTrackData.destinationInfo.country) ? (
                              <Image className="mx-2" src={getCountryFlag(quickTrackData.destinationInfo.country)} alt={quickTrackData.destinationInfo.country} height={{ base: "14px", md: "20px" }} mr={{ base: 1, md: 2 }} />
                            ) : (
                              <Icon as={FiGlobe} mr={{ base: 1, md: 2 }} boxSize={{ base: "12px", md: "16px" }} />
                            )}
                            <Text fontSize={{ base: "2xs", md: "xs" }}>{formatCityName(quickTrackData.destinationInfo.city)}, {quickTrackData.destinationInfo.country}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    )}
                  </Box>
                  
                  <Box>
                    <HStack spacing={2}>
                      <motion.div
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Icon 
                          as={
                            getShipmentStatus(quickTrackData.result) === "Delivered" 
                              ? FiCheckCircle 
                              : FiTruck
                          } 
                          boxSize={6}
                          color="white"
                        />
                      </motion.div>
                      <Tooltip hasArrow label="Share Screenshot" placement="top">
                        <IconButton
                          icon={<FiShare2 />}
                          size="sm"
                          aria-label="Share Screenshot"
                          variant="ghost"
                          color="white"
                          _hover={{ bg: "whiteAlpha.300" }}
                          onClick={() => {
                            const trackingInfo = document.getElementById('quick-track-info');
                            const recentUpdates = document.getElementById('quick-track-updates');
                            if (trackingInfo && recentUpdates) {
                              // Create a container div to hold both elements for the screenshot
                              const container = document.createElement('div');
                              container.style.position = 'absolute';
                              container.style.left = '-9999px';
                              container.style.background = 'white';
                              container.style.padding = '12px';
                              container.style.borderRadius = '8px';
                              container.style.width = '400px';
                              
                              // Clone the elements to avoid modifying the original DOM
                              const statusClone = trackingInfo.cloneNode(true);
                              statusClone.style.padding = '10px';
                              statusClone.style.marginBottom = '8px';
                                              
                                              // Create a filtered clone of the updates section without the button
                                              const updatesClone = recentUpdates.cloneNode(true);
                                              updatesClone.style.padding = '10px';
                                              const buttonElement = updatesClone.querySelector('button');
                                              if (buttonElement && buttonElement.parentNode) {
                                                buttonElement.parentNode.removeChild(buttonElement);
                                              }
                                              
                                              // Make update items more compact
                                              const updateItems = updatesClone.querySelectorAll('[p="3"]');
                                              updateItems.forEach(item => {
                                                item.style.padding = '8px';
                                                item.style.marginBottom = '4px';
                                              });
                                              
                                              // Append clones to container
                                              container.appendChild(statusClone);
                                              container.appendChild(updatesClone);
                                              document.body.appendChild(container);
                              
                              // Take screenshot of the combined container
                              html2canvas(container).then(canvas => {
                                document.body.removeChild(container);
                                canvas.toBlob(blob => {
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `tracking-${quickTrackData.number}.png`;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                  
                                  showToast({
                                    title: "Screenshot Saved",
                                    description: "Tracking screenshot has been saved",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true,
                                  });
                                });
                              });
                            }
                          }}
                        />
                      </Tooltip>
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            
            <Box 
              p={{ base: 2, md: 4 }}
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              id="quick-track-updates"
            >
              <Text fontWeight="semibold" mb={{ base: 1, md: 3 }} fontSize={{ base: "xs", md: "md" }}>Recent Updates</Text>
              <VStack spacing={{ base: 1, md: 3 }} align="start">
                {quickTrackData.result.slice().reverse().map((event, index) => (
                  <Box 
                    key={index} 
                    p={{ base: 1.5, md: 3 }} 
                    borderLeft="2px solid" 
                    borderColor="gray.300" 
                    pl={{ base: 2, md: 4 }} 
                    width="100%"
                    as={motion.div}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  >
                    <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold">{event.Message}</Text>
                    <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
                      {formatDate(event.Timestamp).date}, {formatDate(event.Timestamp).time}
                    </Text>
                  </Box>
                ))}
              </VStack>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Button
                  size={{ base: "xs", md: "sm" }}
                  mt={{ base: 2, md: 4 }}
                  colorScheme="blue"
                  onClick={() => {
                    if (!trackingNumbers.includes(quickTrackData.number)) {
                      setTrackingNumbers(prev => [...prev, quickTrackData.number]);
                    }
                    setSelectedTracking(quickTrackData.number);
                    setShowTrackingSection(true);
                    setActiveSection("tracking");

                    setTimeout(() => {
                      const trackingSection = document.getElementById("tracking-section");
                      if (trackingSection) {
                        trackingSection.scrollIntoView({ behavior: "smooth" });
                        
                        // For mobile - after scrolling to tracking section, show the details directly
                        if (window.innerWidth < 768) {
                          // Wait for the tracking content to be rendered
                          setTimeout(() => {
                            const detailsSection = document.getElementById("tracking-details");
                            if (detailsSection) {
                              detailsSection.scrollIntoView({ behavior: "smooth" });
                            }
                          }, 300);
                        }
                      }
                    }, 100);
                  }}
                >
                  View Full Details
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Need Help Section */}
      <HStack justify="center" spacing={4} pt={2} mt={2}>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<FiInfo />}
          onClick={onContactModalOpen}
          color="blue.600"
        >
          Need Help?
        </Button>
      </HStack>
    </Box>
  </motion.div>
</GridItem>
</Grid>
</Container>
</Box>
)}


     {/* FAQ Section */}
{activeSection === "home" && (
  <Box py={{ base: 8, md: 20 }} bg="gray.50" position="relative" overflow="hidden">
    {/* Decorative background elements */}
    <Box 
      position="absolute" 
      top="0" 
      right="0" 
      w="300px" 
      h="300px" 
      borderRadius="full" 
      bg="blue.50" 
      filter="blur(60px)" 
      opacity="0.6" 
      zIndex="0"
    />
    <Box 
      position="absolute" 
      bottom="0" 
      left="0" 
      w="250px" 
      h="250px" 
      borderRadius="full" 
      bg="teal.50" 
      filter="blur(70px)" 
      opacity="0.4" 
      zIndex="0"
    />

    <Container maxW="container.xl" position="relative" zIndex="1">
      <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={{ base: 6, md: 12 }} alignItems="start">
        <GridItem>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading 
              size={{ base: "lg", md: "2xl" }}
              mb={{ base: 3, md: 5 }}
              className="header-font"
              color="gray.800"
              lineHeight="1.1"
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, teal.500)"
              bgClip="text"
            >
              Frequently Asked Questions
            </Heading>
            <Text fontSize={{ base: "sm", md: "lg" }} color="gray.600" mb={{ base: 4, md: 8 }} maxW="md">
              Find answers to common questions about our shipping services and tracking system. Can't find what you're looking for?
            </Text>
            
            {/* Search FAQ functionality */}
            <Box mb={{ base: 4, md: 8 }}>
              
            </Box>
            
            <Flex gap={{ base: 2, md: 4 }} wrap="wrap">
              <Button 
                colorScheme="blue" 
                size={{ base: "sm", md: "lg" }}
                borderRadius="lg"
                boxShadow="md"
                leftIcon={<FiHelpCircle />}
                onClick={onContactModalOpen}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
                transition="all 0.2s"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                colorScheme="blue" 
                size={{ base: "sm", md: "lg" }}
                borderRadius="lg"
                leftIcon={<FiPackage />}
                _hover={{
                  bg: "blue.50",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
              >
                View All FAQs
              </Button>
            </Flex>
          </motion.div>
        </GridItem>
        
        <GridItem>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box 
              bg="white" 
              borderRadius={{ base: "lg", md: "xl" }}
              boxShadow={{ base: "lg", md: "xl" }}
              overflow="hidden"
              border="1px"
              borderColor="gray.100"
            >
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton 
                      py={{ base: 3, md: 6 }}
                      px={{ base: 4, md: 6 }}
                      _hover={{ bg: "blue.50" }}
                      transition="all 0.2s"
                    >
                      <Box flex="1" textAlign="left">
                        <Flex align="center">
                          
                          <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} color="gray.800">
                            How to Track Your Shipment
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon color="blue.500" boxSize={{ base: 4, md: 6 }} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={{ base: 3, md: 6 }} pt={0} px={{ base: 4, md: 6 }} color="gray.600">
                    <Box pl={{ base: 6, md: 14 }}>
                      <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                        To track your shipment, enter your tracking number in the tracking section available on our homepage. You will instantly receive real-time updates on your package's status, including its current location and estimated delivery time.
                      </Text>
                      <Button 
                        variant="link" 
                        colorScheme="blue" 
                        mt={3}
                        rightIcon={<FiChevronRight />}
                        fontWeight="medium"
                        onClick={handleTrackingButtonClick}
                      >
                        Go to Tracking Page
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
                
                <Divider borderColor="gray.100" />

                <AccordionItem border="none">
                  <h2>
                    <AccordionButton 
                      py={{ base: 3, md: 6 }}
                      px={{ base: 4, md: 6 }}
                      _hover={{ bg: "blue.50" }}
                      transition="all 0.2s"
                    >
                      <Box flex="1" textAlign="left">
                        <Flex align="center">
                          
                          <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} color="gray.800">
                            Understanding Shipment Status
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon color="blue.500" boxSize={{ base: 4, md: 6 }} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={{ base: 3, md: 6 }} pt={0} px={{ base: 4, md: 6 }} color="gray.600">
                    <Box pl={{ base: 6, md: 14 }}>
                      <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                        Shipment statuses include "In Transit," "Out for Delivery," and "Delivered." These statuses provide clear information about your package's journey. Check the tracking section for more detailed descriptions.
                      </Text>
                      <Button 
                        variant="link" 
                        colorScheme="blue" 
                        mt={3}
                        rightIcon={<FiChevronRight />}
                        fontWeight="medium"
                        onClick={handleTrackingButtonClick}
                      >
                        View Status Descriptions
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
                
                <Divider borderColor="gray.100" />
                
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton 
                      py={{ base: 3, md: 6 }}
                      px={{ base: 4, md: 6 }}
                      _hover={{ bg: "blue.50" }}
                      transition="all 0.2s"
                    >
                      <Box flex="1" textAlign="left">
                        <Flex align="center">
                          
                          <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} color="gray.800">
                            What to Do If Tracking Isn't Updating
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon color="blue.500" boxSize={{ base: 4, md: 6 }} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={{ base: 3, md: 6 }} pt={0} px={{ base: 4, md: 6 }} color="gray.600">
                    <Box pl={{ base: 6, md: 14 }}>
                      <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                        If tracking information hasn't updated for an extended period, contact our customer service for assistance. Occasionally, updates may be delayed due to network or logistical issues.
                      </Text>
                      <Button 
                        variant="link" 
                        colorScheme="blue" 
                        mt={3}
                        rightIcon={<FiChevronRight />}
                        fontWeight="medium"
                        onClick={onContactModalOpen}
                      >
                        Contact Customer Service
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
                
                <Divider borderColor="gray.100" />
                
                <AccordionItem border="none">
                  <h2>
                    <AccordionButton 
                      py={{ base: 3, md: 6 }}
                      px={{ base: 4, md: 6 }}
                      _hover={{ bg: "blue.50" }}
                      transition="all 0.2s"
                    >
                      <Box flex="1" textAlign="left">
                        <Flex align="center">
                          
                          <Text fontWeight="semibold" fontSize={{ base: "md", md: "lg" }} color="gray.800">
                            International Tracking
                          </Text>
                        </Flex>
                      </Box>
                      <AccordionIcon color="blue.500" boxSize={{ base: 4, md: 6 }} />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={{ base: 3, md: 6 }} pt={0} px={{ base: 4, md: 6 }} color="gray.600">
                    <Box pl={{ base: 6, md: 14 }}>
                      <Text fontSize={{ base: "sm", md: "md" }} lineHeight="tall">
                        For international shipments, tracking may involve multiple carrier systems. Use the tracking number provided to view updates across different stages of the journey.
                      </Text>
                      <Button 
                        variant="link" 
                        colorScheme="blue" 
                        mt={3}
                        rightIcon={<FiChevronRight />}
                        fontWeight="medium"
                      >
                        Learn About International Shipping
                      </Button>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
            
            {/* Popular questions section */}
            <Box mt={{ base: 4, md: 8 }} p={{ base: 3, md: 5 }} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.100">
              <Flex align="center" mb={{ base: 2, md: 4 }}>
                <Icon as={FiHelpCircle} color="blue.600" mr={2} boxSize={{ base: 4, md: 5 }} />
                <Text fontWeight="medium" color="blue.800" fontSize={{ base: "sm", md: "md" }}>Popular Questions</Text>
              </Flex>
              <Flex gap={{ base: 2, md: 3 }} wrap="wrap">
                <Badge 
                  py={{ base: 1, md: 2 }}
                  px={{ base: 2, md: 3 }}
                  bg="white" 
                  color="gray.700" 
                  borderRadius="md"
                  _hover={{ bg: "blue.100", color: "blue.700" }}
                  boxShadow="sm"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Delivery timeframes
                </Badge>
                <Badge 
                  py={{ base: 1, md: 2 }}
                  px={{ base: 2, md: 3 }}
                  bg="white" 
                  color="gray.700" 
                  borderRadius="md"
                  _hover={{ bg: "blue.100", color: "blue.700" }}
                  boxShadow="sm"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Lost packages
                </Badge>
                <Badge 
                  py={{ base: 1, md: 2 }}
                  px={{ base: 2, md: 3 }}
                  bg="white" 
                  color="gray.700" 
                  borderRadius="md"
                  _hover={{ bg: "blue.100", color: "blue.700" }}
                  boxShadow="sm"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Express shipping
                </Badge>
                <Badge 
                  py={{ base: 1, md: 2 }}
                  px={{ base: 2, md: 3 }}
                  bg="white" 
                  color="gray.700" 
                  borderRadius="md"
                  _hover={{ bg: "blue.100", color: "blue.700" }}
                  boxShadow="sm"
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Customs clearance
                </Badge>
              </Flex>
            </Box>
          </motion.div>
        </GridItem>
      </Grid>
    </Container>
  </Box>
)}

      {/* Bulk Tracking Results Section */}
      {activeSection === "bulk-results" && (
        <Box py={10} bg="gray.50">
          <Container maxW="container.xl">
            <Flex direction="column" spacing={6}>
              
              {/* Back to Track Button */}
              <Box mb={{ base: 3, md: 6 }}>
                <Button
                  size={{ base: "xs", md: "sm" }}
                  leftIcon={<FiArrowLeft />}
                  variant="solid"
                  colorScheme="blue"
                  bg="blue.500"
                  color="white"
                  _hover={{ 
                    bg: "blue.600",
                    transform: "translateY(-1px)",
                    boxShadow: "md"
                  }}
                  _active={{ 
                    bg: "blue.700",
                    transform: "translateY(0px)"
                  }}
                  boxShadow="sm"
                  borderRadius="md"
                  fontWeight="medium"
                  onClick={() => {
                    // Clear all tracking data for a fresh start
                    setTrackingNumbers([]);
                    setTrackingDataMap({});
                    setErrorMap({});
                    setSelectedTracking(null);
                    setShowTrackingSection(false);
                    setQuickTrackData(null);
                    setShowQuickTrackDetails(false);
                    setBulkInput("");
                    setTrackingNumber("");
                    setOrderId("");
                    
                    // Return to home page
                    setActiveSection("home");
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Back to Track
                </Button>
              </Box>
              
              <BulkTrackingResults 
                trackingDataMap={trackingDataMap}
                trackingNumbers={trackingNumbers}
                getStatusColor={getStatusColor}
                getShipmentStatus={getShipmentStatus}
                formatDate={formatDate}
                calculateDeliveryDays={calculateDeliveryDays}
                handleTrack={handleTrack}
                getCountryFlag={getCountryFlag}
                formatCityName={formatCityName}
                setSelectedTracking={setSelectedTracking}
                setActiveSection={setActiveSection}
                setShowTrackingSection={setShowTrackingSection}
                setTrackingNumbers={setTrackingNumbers}
              />
              
              <HStack spacing={4} mt={4} justify="center">
                
                {/* <Button
                  leftIcon={<FiPackage />}
                  colorScheme="blue"
                  onClick={() => {
                    setActiveSection("tracking");
                    setShowTrackingSection(true);
                    
                    // Scroll to tracking section
                    setTimeout(() => {
                      const trackingSection = document.getElementById("tracking-section");
                      if (trackingSection) {
                        trackingSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }, 100);
                  }}
                >
                  View All Trackings
                </Button> */}
              </HStack>
            </Flex>
          </Container>
        </Box>
      )}

      {/* Footer */}
      {activeSection === "home" && (
        <Box bg="gray.900" color="white" pt={{ base: 6, md: 12 }} pb={{ base: 3, md: 6 }}>
          <Container maxW="container.xl">
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={{ base: 4, md: 8 }} mb={{ base: 4, md: 10 }}>
              {/* Column 1 - Logo & About */}
              <GridItem>
                <Flex direction="column" align="flex-start">
                  <Image src={logo} alt="LexShip Logo" height={{ base: "30px", md: "40px" }} mb={{ base: 2, md: 4 }} />
                  <Text color="gray.400" mb={{ base: 2, md: 4 }} fontSize={{ base: "xs", md: "small" }}>
                  LEXSHIP is enabling "Global eCommerce" and simplifying the same in this process through digitization.
                   Transparency, ease of use and simplicity are cornerstones of this solution.
                  </Text>
                  <HStack spacing={{ base: 2, md: 4 }} color="gray.400">
                    <a href="https://www.facebook.com/lexshipdotcom/" target="_blank"> 
                    <IconButton
                      aria-label="Facebook"
                      icon={<FaFacebook />}
                      variant="ghost"
                      color="whiteAlpha"
                      colorScheme="whiteAlpha"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ color: "blue.400" }}
                    />
                    </a>
                    <a href="https://x.com/lexvyu" target="_blank"> 
                    <IconButton
                      aria-label="Twitter"
                      icon={<FaTwitter />}
                      variant="ghost"
                      colorScheme="whiteAlpha"
                      color="whiteAlpha"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ color: "blue.400" }}
                    />
                    </a>
                    <a href="https://www.linkedin.com/company/logilink-india/" target="_blank">
                    <IconButton
                      aria-label="LinkedIn"
                      icon={<FaLinkedin />}
                      variant="ghost"
                      color="whiteAlpha"
                      colorScheme="whiteAlpha"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ color: "blue.400" }}
                    />
                    </a>
                    <a href="https://www.instagram.com/lexshipdotcom/" target="_blank">
                    <IconButton
                      aria-label="Instagram"
                      icon={<FaInstagram />}
                      variant="ghost"
                      color="whiteAlpha"
                      colorScheme="whiteAlpha"
                      size={{ base: "sm", md: "md" }}
                      _hover={{ color: "blue.400" }}
                    />
                    </a>
                  </HStack>
                </Flex>
              </GridItem>
              
              {/* Column 2 - Services */}
              <GridItem>
                <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 2, md: 4 }} color="white" textTransform="uppercase" letterSpacing="wider">
                  Services
                </Heading>
                <VStack align="flex-start" spacing={{ base: 1, md: 2 }}>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Global Shipping</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Express Delivery</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Freight Services</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Business Solutions</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Customs Clearance</Link>
                </VStack>
              </GridItem>
              
              {/* Column 3 - Company */}
              <GridItem>
                <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 2, md: 4 }} color="white" textTransform="uppercase" letterSpacing="wider">
                  Company
                </Heading>
                <VStack align="flex-start" spacing={{ base: 1, md: 2 }}>
                  <Link color="gray.400" _hover={{ color: "white" }} href="https://www.lexship.com/about-us/" target="_blank" fontSize={{ base: "xs", md: "sm" }}>About Us</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} href="https://live1.lexship.com/register" target="_blank" fontSize={{ base: "xs", md: "sm" }}>Signup</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} href="https://live1.lexship.com/login" target="_blank" fontSize={{ base: "xs", md: "sm" }}>Login</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} href="https://www.lexship.com/category/cross-border-e-commerce/" target="_blank" fontSize={{ base: "xs", md: "sm" }}>Blog</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} href="https://www.lexship.com/marketplace/" target="_blank" fontSize={{ base: "xs", md: "sm" }}>Marketplace Integration</Link>
                </VStack>
              </GridItem>
              
              {/* Column 4 - Support */}
              <GridItem>
                <Heading size={{ base: "xs", md: "sm" }} mb={{ base: 2, md: 4 }} color="white" textTransform="uppercase" letterSpacing="wider">
                  Support
                </Heading>
                <VStack align="flex-start" spacing={{ base: 1, md: 2 }}>
                  <Link color="gray.400" _hover={{ color: "white" }} onClick={onContactModalOpen} fontSize={{ base: "xs", md: "sm" }}>Help Center</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} onClick={onContactModalOpen} fontSize={{ base: "xs", md: "sm" }}>Contact Us</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>FAQs</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Track Shipment</Link>
                  <Link color="gray.400" _hover={{ color: "white" }} fontSize={{ base: "xs", md: "sm" }}>Report Issue</Link>
                </VStack>
              </GridItem>
            </Grid>
            
            {/* Copyright & Legal Links */}
            <Divider borderColor="gray.700" my={{ base: 3, md: 6 }} />
            <Flex 
              direction={{ base: "column", md: "row" }} 
              justify="space-between" 
              align={{ base: "center", md: "center" }}
              fontSize={{ base: "xs", md: "sm" }}
              color="gray.500"
            >
              <Text mb={{ base: 2, md: 0 }}>© 2025 Lexship. All rights reserved.</Text>
              <HStack spacing={{ base: 2, md: 4 }}>
                <Link color="gray.500" _hover={{ color: "gray.300" }} fontSize={{ base: "xs", md: "sm" }}>Privacy Policy</Link>
                <Link color="gray.500" _hover={{ color: "gray.300" }} fontSize={{ base: "xs", md: "sm" }}>Terms of Service</Link>
                <Link color="gray.500" _hover={{ color: "gray.300" }} fontSize={{ base: "xs", md: "sm" }}>Cookie Policy</Link>
              </HStack>
            </Flex>
          </Container>
        </Box>
      )}

      

      {/* Tracking Section */}
      {(activeSection === "tracking" && showTrackingSection) && (
        <Box py={{ base: 2, md: 10 }} id="tracking-section" bg="gray.50" width="100%" maxW="100%">
          <Container maxW="100%" px={{ base: 2, lg: 8 }}>
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={containerVariants}
              width="100%"
            >
              <Flex direction="column" spacing={6} width="100%">
                {/* Back button */}
                <Box mb={{ base: 1, md: 3 }}>
                  <Button
                    size={{ base: "xs", md: "sm" }}
                    leftIcon={<FiArrowLeft />}
                    variant="solid"
                    colorScheme="blue"
                    bg="blue.500"
                    color="white"
                    _hover={{ 
                      bg: "blue.600",
                      transform: "translateY(-1px)",
                      boxShadow: "md"
                    }}
                    _active={{ 
                      bg: "blue.700",
                      transform: "translateY(0px)"
                    }}
                    boxShadow="sm"
                    borderRadius="md"
                    fontWeight="medium"
                    onClick={() => {
                      // Store current AWB number to reselect when returning to bulk view
                      const currentAwb = selectedTracking;
                      
                      // We need to restore the original bulk tracking list before switching views
                      // This will be determined by the existing data in trackingDataMap
                      if (Object.keys(trackingDataMap).length > 1) {
                        // Restore all tracking numbers from trackingDataMap
                        const allNumbers = Object.keys(trackingDataMap);
                        setTrackingNumbers(allNumbers);
                        
                        // Preserve the selected tracking for highlight in bulk view
                        setSelectedTracking(currentAwb);
                      }
                      
                      // Go back to bulk results view
                      setActiveSection("bulk-results");
                    }}
                  >
                    Back to Track
                  </Button>
                </Box>
                
                <Heading size={{ base: "sm", md: "lg" }} mb={{ base: 1, md: 6 }} className="header-font" color="gray.800">Track Your Shipments</Heading>
                
                <Card mb={{ base: 2, md: 6 }} boxShadow="sm" bg="white" as={motion.div} variants={itemVariants} width="100%">
                  <CardBody p={{ base: 2, md: 6 }}>
                    <motion.div variants={itemVariants}>
                      <Flex 
                        direction={{ base: "column", md: "row" }} 
                        justify="space-between" 
                        align={{ base: "stretch", md: "center" }}
                        mb={{ base: 2, md: 6 }}
                      >
                        <Box mb={{ base: 2, md: 0 }} maxW={{ base: "full", md: "70%" }}>
                          <Text color="gray.500" className="subtitle-font" fontSize={{ base: "xs", md: "md" }}>
                            Enter your tracking number to monitor delivery status and progress
                          </Text>
                        </Box>
                      </Flex>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Flex 
                        direction={{ base: "column", md: "row" }} 
                        gap={{ base: 2, md: 4 }}
                      >
                        <InputGroup size={{ base: "sm", md: "md" }} flex="1">
                          <Input
                            placeholder="Enter tracking number"
                            value={trackingNumber}
                            onChange={(e) => setTrackingNumber(e.target.value)}
                            onKeyPress={handleKeyPress}
                            borderRadius="md"
                            bg="white"
                            color="black"
                            borderColor="gray.300"
                            _placeholder={{ 
                              color: "gray.500" 
                            }}
                            _focus={{ 
                              borderColor: "blue.400", 
                              boxShadow: "0 0 0 1px blue.400" 
                            }}
                          />
                          {trackingNumber && (
                            <InputRightElement>
                              <IconButton
                                icon={<FiX />}
                                aria-label="Clear input"
                                size="sm"
                                variant="ghost"
                                onClick={() => setTrackingNumber("")}
                              />
                            </InputRightElement>
                          )}
                        </InputGroup>
                        
                        <Button
                          colorScheme="blue"
                          onClick={handleAddTracking}
                          leftIcon={<FiPlus />}
                          px={{ base: 4, md: 6 }}
                          size={{ base: "sm", md: "md" }}
                          flexShrink={0}
                        >
                          Track
                        </Button>
                        
                        <Tooltip 
                          label="You can also use the Bulk Track tab on the home page" 
                          hasArrow 
                          placement="top"
                        >
                          <Button
                            onClick={onBulkModalOpen}
                            leftIcon={<FiFileText />}
                            variant="outline"
                            bgColor="black"
                            color="white"
                            _hover={{ bg: "gray.800" }}
                            size={{ base: "sm", md: "md" }}
                            flexShrink={0}
                          >
                            Bulk Track
                          </Button>
                        </Tooltip>
                      </Flex>
                    </motion.div>
                    
                    {/* Stats Bar */}
                    {trackingNumbers.length > 0 && (
                      <motion.div 
                        variants={itemVariants}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {(() => {
                          const stats = calculateStats();
                          // Check if selected tracking is delivered
                          const selectedTrackingData = selectedTracking && trackingDataMap[selectedTracking];
                          const isSelectedDelivered = selectedTrackingData?.result ? 
                            getShipmentStatus(selectedTrackingData.result) === "Delivered" : false;
                          
                          return (
                            <SimpleGrid 
                              columns={{ 
                                base: 2, 
                                md: 3, 
                                lg: isSelectedDelivered ? 5 : 6 
                              }} 
                              spacing={{ base: 1, md: 4 }} 
                              mt={{ base: 2, md: 6 }}
                            >
                              <StatCard
                                icon={FiPackage}
                                title="Total Shipments"
                                value={stats.total}
                                colorScheme="gray"
                              />
                              <StatCard
                                icon={FiCheckCircle}
                                title="Delivered"
                                value={stats.delivered}
                                colorScheme="green"
                              />
                              <StatCard
                                icon={FiTruck}
                                title="In Transit"
                                value={stats.inTransit}
                                colorScheme="blue"
                              />
                              <StatCard
                                icon={FiClock}
                                title="Processing"
                                value={stats.processing + stats.unknown}
                                colorScheme="purple"
                              />
                              {/* Only show Estimated Delivery if selected tracking is not delivered */}
                              {!isSelectedDelivered && (
                                <StatCard
                                  icon={FiTarget}
                                  title="Estimated Delivery"
                                  value="N/A"
                                  colorScheme="teal"
                                />
                              )}
                              <StatCard
                                icon={FiCalendar}
                                title="Total Days"
                                value={selectedTracking && trackingDataMap[selectedTracking]?.result ? 
                                  `${calculateDeliveryDays(trackingDataMap[selectedTracking].result).businessDays} days` : 
                                  stats.avgBusinessDays > 0 ? `${stats.avgBusinessDays} days` : "N/A"}
                                colorScheme="orange"
                              />
                            </SimpleGrid>
                          );
                        })()}
                      </motion.div>
                    )}
                  </CardBody>
                </Card>
                
                {/* Tracking Content Area */}
                {trackingNumbers.length > 0 && (
                  <Flex gap={{ base: 3, md: 6 }} direction={{ base: "column", lg: viewMode === "detailed" ? "row" : "column" }} width="100%">
                    {/* Sidebar Tracking List */}
                    <Card 
                      w={{ base: "full", lg: viewMode === "detailed" ? "280px" : "full" }}
                      boxShadow="sm" 
                      bg="white"
                      as={motion.div} 
                      variants={itemVariants}
                      height="fit-content"
                    >
                      <CardBody p={0}>
                        <Flex px={{ base: 2, md: 1 }} py={{ base: 2, md: 3 }} borderBottom="1px" borderColor="gray.200" justify="space-between" align="center">
                          <Heading size={{ base: "xs", md: "sm" }} color="gray.700" className="header-font">Your Trackings ({trackingNumbers.length})</Heading>
                          {trackingNumbers.length > 1 && (
                            <HStack spacing={1}>
                              <Button
                                size="xs"
                                colorScheme="teal"
                                color="chocolate"
                                variant="ghost"
                                leftIcon={<FiRefreshCw />}
                                onClick={handleTrackAll}
                              >
                                Refresh All
                              </Button>
                              <Button
                                size="xs"
                                colorScheme="red"
                                color="red"
                                variant="ghost"
                                leftIcon={<FiX />}
                                onClick={onRemoveAllModalOpen}
                              >
                                Remove All
                              </Button>
                            </HStack>
                          )}
                        </Flex>
                        
                        <VStack 
                          spacing={0} 
                          align="stretch" 
                          maxH={{ base: "300px", md: "500px" }} 
                          overflowY="auto"
                          sx={{
                            scrollbarWidth: 'none', /* For Firefox */
                            msOverflowStyle: 'none', /* For Internet Explorer and Edge */
                            '&::-webkit-scrollbar': {
                              width: '0px',
                              background: 'transparent', /* Optional: make scrollbar transparent */
                            }
                          }}
                        >
                          <AnimatePresence>
                            {trackingNumbers.map((number) => {
                              const data = trackingDataMap[number];
                              const error = errorMap[number];
                              const status = data?.result ? getShipmentStatus(data.result) : "Unknown";
                              const statusColor = getStatusColor(status);
                              const StatusIcon = getStatusIcon(status);
                              
                              return (
                                <motion.div
                                  key={number}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <LinkBox
                                    role="group"
                                    as={Flex}
                                    p={2}
                                    borderBottom="1px"
                                    borderColor="gray.200"
                                    bg={selectedTracking === number ? "blue.50" : "white"}
                                    borderLeft={selectedTracking === number ? "3px solid" : "none"}
                                    borderLeftColor="gray.500"
                                    cursor="pointer"
                                    _hover={{ bg: "gray.50" }}
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent any default behavior
                                      console.log("Selected tracking changed to:", number);
                                      
                                      // Force loading immediately if data doesn't exist yet
                                      if (!trackingDataMap[number] || !trackingDataMap[number].result) {
                                        handleTrack(number);
                                      }
                                      
                                      // Set the selected tracking with a small delay to ensure state updates properly
                                      setTimeout(() => {
                                        setSelectedTracking(number);
                                      }, 10);
                                    }}
                                    align="center"
                                  >
                                                                          <Circle 
                                      size="32px"
                                      bg={`${statusColor}.100`} 
                                      color={`${statusColor}.500`}
                                      mr={2}
                                      flexShrink={0}
                                    >
                                      <Icon as={StatusIcon} boxSize={3.5} />
                                    </Circle>
                                    
                                    <Box flex="1" overflow="hidden">
                                      <Flex justify="space-between" align="center">
                                        <LinkOverlay href="#">
                                          <Text fontWeight="small" isTruncated color="gray.700" fontSize="sm" maxW="160px">
                                            {number}
                                          </Text>
                                        </LinkOverlay>
                                        {data?.result && (
                                          <Text fontSize="xs" color="gray.500" ml={1}>
                                            {formatDate(data.result[data.result.length - 1]?.Timestamp).date}
                                          </Text>
                                        )}
                                      </Flex>
                                      <Badge 
                                        colorScheme={statusColor} 
                                        borderRadius="full"
                                        px={2}
                                        py={0.5}
                                        mt={1}
                                        fontSize="xs"
                                      >
                                        {status}
                                      </Badge>
                                    </Box>
                                    
                                    <HStack 
                                      spacing={0.5} 
                                      opacity={1}
                                      transition="opacity 0.2s"
                                      _groupHover={{ opacity: 1 }}
                                      p={0.5}
                                      borderRadius="md"
                                      ml={1}
                                    >
                                      <IconButton
                                        icon={<FiRefreshCw />}
                                        aria-label="Refresh tracking"
                                        size="xs"
                                        variant="solid"
                                        color="green.600"
                                        bg="green.100"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleTrack(number);
                                        }}
                                      />
                                      <IconButton
                                        icon={<FiX />}
                                        aria-label="Remove tracking"
                                        size="xs"
                                        variant="solid"
                                        bg="red.100"
                                        color="red.600"
                                        _hover={{ bg: "red.200" }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveTracking(number);
                                        }}
                                      />
                                    </HStack>
                                  </LinkBox>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </VStack>
                      </CardBody>
                    </Card>
                    
                    {/* Tracking Detail Section (Integrated) */}
                    <Box flex="1" width="100%" id="tracking-details">
                      {!selectedTracking ? (
                        <Flex 
                          justify="center" 
                          align="center" 
                          bg="white" 
                          borderRadius="md" 
                          p={10}
                          boxShadow="sm"
                          direction="column"
                          height="100%"
                          minH="300px"
                          width="100%"
                        >
                          <Icon as={FiPackage} boxSize={12} color="gray.300" mb={4} />
                          <Text fontSize="lg" fontWeight="medium" color="gray.500" mb={2}>
                            Select a tracking number
                          </Text>
                          <Text color="gray.400" textAlign="center">
                            Choose a tracking number from the list to view detailed information
                          </Text>
                        </Flex>
                      ) : (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedTracking}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={fadeVariants}
                            width="100%"
                          >
                            {errorMap[selectedTracking] ? (
                              <Card boxShadow="sm" bg="red.50" mb={6} width="100%">
                                <CardBody>
                                  <Flex align="center">
                                    <Circle size="40px" bg="red.100" color="red.500" mr={3}>
                                      <Icon as={FiAlertCircle} boxSize={5} />
                                    </Circle>
                                    <Box>
                                      <Heading size="sm" color="red.500" mb={1}>
                                        Tracking Error for {selectedTracking}
                                      </Heading>
                                      <Text color="red.600">{errorMap[selectedTracking]}</Text>
                                    </Box>
                                  </Flex>
                                  <Button 
                                    mt={4} 
                                    leftIcon={<FiRefreshCw />} 
                                    colorScheme="red"
                                    variant="outline"
                                    onClick={() => handleTrack(selectedTracking)}
                                    size="sm"
                                  >
                                    Try Again
                                  </Button>
                                </CardBody>
                              </Card>
                            ) : !trackingDataMap[selectedTracking] ? (
                              <Card boxShadow="sm" mb={6} bg="white" width="100%">
                                <CardBody>
                                  <Flex align="center" justify="center" direction="column" py={10}>
                                    <Circle size="80px" bg="blue.50" mb={4}>
                                      <Icon as={FiSearch} boxSize={8} color="blue.500" />
                                    </Circle>
                                    <Heading size="md" mb={2} color="gray.700" className="header-font">Loading Tracking Information</Heading>
                                    <Text color="gray.500" mb={4}>
                                      Fetching data for {selectedTracking}...
                                    </Text>
                                    {loading && <Spinner color="teal.500" size="lg" />}
                                    <Button 
                                      mt={6} 
                                      leftIcon={<FiRefreshCw />} 
                                      colorScheme="teal"
                                      onClick={() => handleTrack(selectedTracking)}
                                      size="md"
                                      isLoading={loading}
                                    >
                                      Refresh
                                    </Button>
                                  </Flex>
                                </CardBody>
                              </Card>
                            ) : (
                              <>
                                <Heading size="md" mb={4} className="header-font" color="gray.700">Tracking Details</Heading>
                                {/* Status Card */}
                                <Card boxShadow="sm" mb={6} overflow="hidden" bg="white" width="100%" id="status-card">
                                  <Box 
                                    bg={
                                      getShipmentStatus(trackingDataMap[selectedTracking].result) === "Delivered" 
                                        ? "green.500" 
                                        : "blue.500"
                                    } 
                                    color="white"
                                    p={{ base: 3, md: 6 }}
                                    position="relative"
                                    overflow="hidden"
                                  >
                                    {/* Decorative elements */}
                                    <Box 
                                      position="absolute" 
                                      right="-20px" 
                                      top="-20px" 
                                      borderRadius="full"
                                      bg="whiteAlpha.200" 
                                      w="150px" 
                                      h="150px"
                                    />
                                    <Box 
                                      position="absolute"
                                      right="30px" 
                                      bottom="-30px" 
                                      borderRadius="full"
                                      bg="whiteAlpha.100" 
                                      w="100px" 
                                      h="100px"
                                    />
                                    
                                    <Flex justify="space-between" align="flex-start">
                                      <Box>
                                        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" mb={{ base: 0.5, md: 1 }}>
                                          Tracking ID: {selectedTracking || "No tracking selected"}
                                        </Text>
                                        {/* Heading banner */}
                                        <Heading size={{ base: "md", md: "xl" }} fontWeight="bold" mb={{ base: 1, md: 2 }} className="header-font">
                                          {trackingDataMap[selectedTracking]?.result && trackingDataMap[selectedTracking].result.length > 0 
                                            ? trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Message
                                            : "No tracking data yet"
                                          }
                                        </Heading>
                                        
                                        {trackingDataMap[selectedTracking].result && trackingDataMap[selectedTracking].result.length > 0 && (
                                          <Text fontSize={{ base: "2xs", md: "sm" }} fontWeight="medium">
                                            {getLatestUpdateDate(trackingDataMap[selectedTracking].result)}
                                          </Text>
                                        )}
                                      </Box>
                                      
                                      <Box>
                                        <Icon 
                                          as={
                                            getShipmentStatus(trackingDataMap[selectedTracking].result) === "Delivered" 
                                              ? FiCheckCircle 
                                              : FiTruck
                                          } 
                                          boxSize={{ base: 6, md: 10 }}
                                        />
                                      </Box>
                                    </Flex>
                                    
                                    {/* Horizontal Shipment Progress Tracker */}
                                    <Box mt={{ base: 4, md: 8 }} mx={-6} px={{ base: 4, md: 6 }} pb={{ base: 2, md: 3 }} overflowX="auto" sx={{
                                      '&::-webkit-scrollbar': {
                                        display: 'none',
                                      },
                                      'scrollbarWidth': 'none',
                                      'msOverflowStyle': 'none',
                                    }}>
                                      {/* Shipment Progress Steps */}
                                      <Flex 
                                        position="relative" 
                                        justify="space-between" 
                                        align="center" 
                                        w="full" 
                                        minW={{ base: "650px", md: "900px" }}
                                      >
                                        {/* Connecting Line */}
                                        <Box 
                                          position="absolute" 
                                          height="2px" 
                                          bg="whiteAlpha.400" 
                                          left="40px" 
                                          right="40px" 
                                          top="22px" 
                                          zIndex={1}
                                        />

                                        {/* Progress Line */}
                                        <motion.div
                                          initial={{ width: "0%" }}
                                          animate={{ 
                                            width: `calc(${getProgressPercentage(trackingDataMap[selectedTracking]?.result || [])}% * 0.93)`,
                                            transition: { duration: 2.2, ease: "easeInOut" }
                                          }}
                                          style={{
                                            position: "absolute",
                                            height: "2px",
                                            background: "white",
                                            left: "40px",
                                            top: "22px",
                                            zIndex: 2,
                                            borderRadius: "2px",
                                            boxShadow: "0 0 8px rgba(255,255,255,0.5)"
                                          }}
                                        />

                                        {/* Step 1: Created */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="38px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 10 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 0.3 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 10 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 10 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FiFileText} boxSize={5} />
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Created</Text>
                                        </Box>

                                        {/* Step 3: Ready For Pickup */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="44px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 25 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 0.5 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 25 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 25 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FaBoxOpen} boxSize={5} />
                                            {getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 25 && (
                                              <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ 
                                                  scale: 1, 
                                                  opacity: 1,
                                                  transition: { 
                                                    delay: 0.5,
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 500
                                                  }
                                                }}
                                                style={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  pointerEvents: "none"
                                                }}
                                              />
                                            )}
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Ready for</Text>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Pickup</Text>
                                        </Box>

                                        {/* Step 4: Picked Up */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="44px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 40 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 0.8 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 40 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 40 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FaTruckLoading} boxSize={5} />
                                            {getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 40 && (
                                              <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ 
                                                  scale: 1, 
                                                  opacity: 1,
                                                  transition: { 
                                                    delay: 0.6,
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 500
                                                  }
                                                }}
                                                style={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  pointerEvents: "none"
                                                }}
                                              />
                                            )}
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Picked Up</Text>
                                        </Box>

                                        {/* Step 5: Cleared Origin */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="38px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 55 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 1 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 55 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 55 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FiClock} boxSize={5} />
                                            {getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 55 && (
                                              <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ 
                                                  scale: 1, 
                                                  opacity: 1,
                                                  transition: { 
                                                    delay: 0.7,
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 500
                                                  }
                                                }}
                                                style={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  pointerEvents: "none"
                                                }}
                                              />
                                            )}
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Cleared Origin</Text>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Customs</Text>
                                        </Box>

                                        {/* Step 6: Uplifted */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="44px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 65 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 1.2 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 65 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 65 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FaPlaneDeparture} boxSize={5} />
                                            {getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 65 && (
                                              <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ 
                                                  scale: 1, 
                                                  opacity: 1,
                                                  transition: { 
                                                    delay: 0.75,
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 500
                                                  }
                                                }}
                                                style={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  pointerEvents: "none"
                                                }}
                                              />
                                            )}
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Uplifted</Text>
                                        </Box>

                                        {/* Step 7: Cleared Destination */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="38px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 70 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 1.5 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 70 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 70 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FiMapPin} boxSize={5} />
                                            {getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 70 && (
                                              <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ 
                                                  scale: 1, 
                                                  opacity: 1,
                                                  transition: { 
                                                    delay: 0.8,
                                                    duration: 0.5,
                                                    type: "spring",
                                                    stiffness: 500
                                                  }
                                                }}
                                                style={{
                                                  position: "absolute",
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  pointerEvents: "none"
                                                }}
                                              />
                                            )}
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Destination</Text>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Customs</Text>
                                        </Box>

                                        {/* Step 8: Out for Delivery */}
                                        <Box position="relative" zIndex={3} textAlign="center" width="70px">
                                          <Circle 
                                            size="38px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 80 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 1.6 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 80 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 80 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={TbTruckDelivery} boxSize={5} />
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Out for Delivery</Text>
                                        </Box>
                                        
                                        {/* Step 8.5: Unsuccessful Delivery - Only show if latest status is an unsuccessful delivery */}
                                        {trackingDataMap[selectedTracking].result && 
                                         trackingDataMap[selectedTracking].result.length > 0 &&
                                         (trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Message.toLowerCase().includes("unsuccessful") || 
                                          trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Message.toLowerCase().includes("delivery failed") || 
                                          trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Message.toLowerCase().includes("failed delivery")) && (
                                          <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                            <Circle 
                                              size="38px" 
                                              as={motion.div}
                                              initial={{ background: "transparent" }}
                                              animate={{ 
                                                background: "white",
                                                transition: { duration: 0.5, delay: 1.8 }
                                              }}
                                              color="orange.500" 
                                              mb={2}
                                              mx="auto"
                                              boxShadow="0 0 0 4px rgba(255,165,0,0.3)"
                                              position="relative"
                                              borderWidth="2px"
                                              borderColor="orange.300"
                                              borderStyle="dashed"
                                            >
                                              <Icon as={FaExclamationTriangle} boxSize={5} />
                                            </Circle>
                                            <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap" color="orange.300">
                                              Delivery Failed
                                            </Text>
                                          </Box>
                                        )}

                                        {/* Step 9: Delivered */}
                                        <Box position="relative" zIndex={3} textAlign="center" width={{ base: "60px", md: "70px" }}>
                                          <Circle 
                                            size="38px" 
                                            as={motion.div}
                                            initial={{ background: "transparent" }}
                                            animate={{ 
                                              background: getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 100 ? "white" : "transparent",
                                              transition: { duration: 0.5, delay: 2 }
                                            }}
                                            color={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 100 ? "green.500" : "whiteAlpha.700"}
                                            mb={2}
                                            mx="auto"
                                            boxShadow={getProgressPercentage(trackingDataMap[selectedTracking]?.result || []) >= 100 ? "0 0 0 4px rgba(255,255,255,0.2)" : "none"}
                                            position="relative"
                                            borderWidth="2px"
                                            borderColor="whiteAlpha.300"
                                          >
                                            <Icon as={FiCheckCircle} boxSize={5} />
                                          </Circle>
                                          <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="medium" textAlign="center" whiteSpace="nowrap">Delivered</Text>
                                        </Box>
                                      </Flex>
                                    </Box>
                                  </Box>
                                  
                                  <CardBody p={{ base: 2, md: 6 }}>
                                    <SimpleGrid columns={{ base: 2, md: 2 }} spacing={{ base: 2, md: 6 }}>
                                      <Box>
                                        <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>Tracking Number</Text>
                                        <HStack spacing={{ base: 0.5, md: 2 }}>
                                          <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }} color="black" noOfLines={1}>{selectedTracking}</Text>
                                          <IconButton
                                            icon={<FiCopy />}
                                            aria-label="Copy tracking number"
                                            size="xs"
                                            variant="ghost"
                                            color="gray.900"
                                            onClick={() => handleCopyTracking(selectedTracking)}
                                          />
                                        </HStack>
                                      </Box>
                                      
                                      {trackingDataMap[selectedTracking].result && trackingDataMap[selectedTracking].result.length > 0 && (
                                        <>
                                          <Box>
                                            <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>Last Update</Text>
                                            <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }} color="black">
                                              {formatDate(trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Timestamp).date}
                                              {" "}
                                              {formatDate(trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Timestamp).time}
                                            </Text>
                                          </Box>
                                          
                                          <Box>
                                            <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>Current Status</Text>
                                            <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }} color="black" noOfLines={2}>
                                              {trackingDataMap[selectedTracking].result[trackingDataMap[selectedTracking].result.length - 1].Message}
                                            </Text>
                                          </Box>
                                          
                                          {trackingDataMap[selectedTracking].originInfo && trackingDataMap[selectedTracking].destinationInfo && (
                                            <Box>
                                              <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>Shipment Route</Text>
                                              <Flex 
                                                color="gray.700" 
                                                borderRadius="md" 
                                                px={{ base: 1, md: 3 }} 
                                                py={{ base: 1, md: 2 }} 
                                                fontSize={{ base: "2xs", md: "sm" }} 
                                                fontWeight="medium" 
                                                alignItems="center"
                                                maxW="fit-content"
                                                mb={{ base: 1, md: 2 }}
                                              >
                                                <Flex align="center" mr={{ base: 1, md: 2 }}>
                                                  {getCountryFlag(trackingDataMap[selectedTracking].originInfo.country) ? (
                                                    <Image src={getCountryFlag(trackingDataMap[selectedTracking].originInfo.country)} alt={trackingDataMap[selectedTracking].originInfo.country} height={{ base: "14px", md: "20px" }} mr={{ base: 1, md: 2 }} />
                                                  ) : (
                                                    <Icon as={FiGlobe} mr={{ base: 1, md: 2 }} boxSize={{ base: 2, md: 4 }} />
                                                  )}
                                                  
                                                  <Text noOfLines={1} fontSize={{ base: "2xs", md: "sm" }}>
                                                    <Box display={{ base: "none", md: "block" }}>{formatCityName(trackingDataMap[selectedTracking].originInfo.city)}, {trackingDataMap[selectedTracking].originInfo.country}</Box>
                                                    <Box display={{ base: "block", md: "none" }}>{trackingDataMap[selectedTracking].originInfo.country}</Box>
                                                  </Text>
                                                </Flex>
                                                
                                                <Icon as={FiArrowRight} boxSize={{ base: 3, md: 4 }} mx={{ base: 1, md: 2 }} />
                                                
                                                <Flex align="center">
                                                  {getCountryFlag(trackingDataMap[selectedTracking].destinationInfo.country) ? (
                                                    <Image className="mx-2" src={getCountryFlag(trackingDataMap[selectedTracking].destinationInfo.country)} alt={trackingDataMap[selectedTracking].destinationInfo.country} height={{ base: "14px", md: "20px" }} mr={{ base: 1, md: 2 }} />
                                                  ) : (
                                                    <Icon as={FiGlobe} mr={{ base: 1, md: 2 }} boxSize={{ base: 2, md: 4 }} />
                                                  )}
                                                  <Text noOfLines={1} fontSize={{ base: "2xs", md: "sm" }}>
                                                    <Box display={{ base: "none", md: "block" }}>{formatCityName(trackingDataMap[selectedTracking].destinationInfo.city)}, {trackingDataMap[selectedTracking].destinationInfo.country}</Box>
                                                    <Box display={{ base: "block", md: "none" }}>{trackingDataMap[selectedTracking].destinationInfo.country}</Box>
                                                  </Text>
                                                </Flex>
                                              </Flex>
                                            </Box>
                                          )}
                                          
                                                                                <Box>
                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>Shipment Events</Text>
                                        <Text fontWeight="medium" fontSize={{ base: "xs", md: "sm" }} color="black">
                                          {trackingDataMap[selectedTracking].result.length} tracked events
                                        </Text>
                                      </Box>
                                          
                                          <Box>
                                            <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500" mb={{ base: 0.5, md: 1 }}>
                                              {calculateDeliveryDays(trackingDataMap[selectedTracking].result).isComplete ? 
                                                "Total Days to Deliver" : "Days in Transit"}
                                            </Text>
                                            <HStack spacing={{ base: 1, md: 2 }}>
                                              <Icon as={FiCalendar} color="orange.500" boxSize={{ base: 3, md: 4 }} />
                                              <Text fontWeight="medium" fontSize={{ base: "xs", md: "md" }} color="black">
                                                {calculateDeliveryDays(trackingDataMap[selectedTracking].result).businessDays} days
                                              </Text>
                                            </HStack>
                                          </Box>
                                        </>
                                      )}
                                    </SimpleGrid>
                                    
                                    <Button
                                      mt={{ base: 2, md: 6 }}
                                      leftIcon={<FiRefreshCw />}
                                      colorScheme="teal"
                                      onClick={() => handleTrack(selectedTracking)}
                                      size={{ base: "xs", md: "sm" }}
                                      isLoading={loading}
                                      py={{ base: 1, md: 2 }}
                                      height={{ base: "24px", md: "auto" }}
                                    >
                                      Refresh
                                    </Button>
                                  </CardBody>
                                </Card>
                                
                                {/* Tracking Timeline */}
                                <Card bg="white" shadow="sm" borderRadius="lg" overflow="hidden" width="100%" id="tracking-timeline">
                                  <CardBody p={{ base: 2, md: 6 }}>
                                    <Flex justify="space-between" align="center" mb={{ base: 2, md: 6 }}>
                                      <Text fontSize={{ base: "xs", md: "md" }} fontWeight="medium" color="gray.700" className="header-font">
                                        Tracking History
                                      </Text>
                                      
                                      {trackingDataMap[selectedTracking].result && trackingDataMap[selectedTracking].result.length > 0 && (
                                        <HStack spacing={2}>
                                          <Badge colorScheme="blue" fontSize={{ base: "2xs", md: "sm" }}>
                                            {trackingDataMap[selectedTracking].result.length} events
                                          </Badge>
                                          <Tooltip label="Download tracking history as PDF" placement="top" hasArrow>
                                            <IconButton
                                              icon={<FiDownload />}
                                              size={{ base: "xs", md: "sm" }}
                                              colorScheme="blue"
                                              variant="solid"
                                              aria-label="Download PDF"
                                              onClick={() => generateTrackingHistoryPDF(selectedTracking)}
                                              bg="blue.500"
                                              color="white"
                                              _hover={{ 
                                                bg: "blue.600",
                                                transform: "translateY(-1px)"
                                              }}
                                              _active={{ 
                                                bg: "blue.700",
                                                transform: "translateY(0px)"
                                              }}
                                              boxShadow="sm"
                                            />
                                          </Tooltip>
                                        </HStack>
                                      )}
                                    </Flex>

                                    {trackingDataMap[selectedTracking].result && trackingDataMap[selectedTracking].result.length > 0 ? (
                                      <VStack 
                                        spacing={0} 
                                        align="stretch" 
                                        maxH={{ base: "none", md: trackingDataMap[selectedTracking].result.length > 8 ? "600px" : "auto" }}
                                        overflowY={{ base: "visible", md: trackingDataMap[selectedTracking].result.length > 8 ? "auto" : "visible" }}
                                        pr={{ base: 0, md: trackingDataMap[selectedTracking].result.length > 8 ? 2 : 0 }}
                                        css={{
                                          '&::-webkit-scrollbar': {
                                            width: '8px',
                                            display: { base: 'none', md: '8px' },
                                          },
                                          '&::-webkit-scrollbar-track': {
                                            width: '10px',
                                            background: 'rgba(0,0,0,0.05)',
                                            borderRadius: '4px',
                                          },
                                          '&::-webkit-scrollbar-thumb': {
                                            background: 'rgba(0,0,0,0.2)',
                                            borderRadius: '4px',
                                          },
                                          'scrollbarWidth': { base: 'none', md: 'auto' },
                                          'msOverflowStyle': { base: 'none', md: 'auto' },
                                        }}
                                        id="tracking-events-container"
                                        ref={timelineContainerRef}
                                      >
                                        {trackingDataMap[selectedTracking].result.slice().reverse().map((item, index) => {
                                          const isDelivered = item.Message.toLowerCase().includes("delivered");
                                          const isLatest = index === 0;
                                          const { date, time } = formatDate(item.Timestamp);
                                          const location = getLocationInfo(item.Message);
                                          const statusTitle = getStatusTitle(item.Message);
                                          const StatusIcon = getStatusIcon(item.Message);
                                          const statusColor = getStatusColor(item.Message);
                                          
                                          return (
                                            <motion.div
                                              key={index}
                                              initial={{ opacity: 0, x: -20 }}
                                              whileInView={{ 
                                                opacity: 1, 
                                                x: 0,
                                                transition: { 
                                                  duration: 0.3,
                                                  ease: "easeOut"
                                                }
                                              }}
                                              viewport={{ once: true, amount: 0.3 }}
                                              ref={isLatest ? firstTimelineEventRef : null}
                                            >
                                                                                              <Flex 
                                                mb={index < trackingDataMap[selectedTracking].result.length - 1 ? { base: 1, md: 5 } : 0}
                                                flexDir={["row", "row", "row"]}
                                                align="flex-start"
                                              >
                                                {/* Left column - Date and time */}
                                                <VStack 
                                                  align={["flex-start", "flex-start", "flex-start"]} 
                                                  spacing={0} 
                                                  minW={["auto", "auto", "140px"]} 
                                                  mr={[0, 0, 4]}
                                                  pt={{ base: 0, md: 1 }}
                                                  mb={[1, 1, 0]}
                                                  as={motion.div}
                                                  initial={{ opacity: 0 }}
                                                  whileInView={{ 
                                                    opacity: 1,
                                                    transition: { 
                                                      duration: 0.3
                                                    }
                                                  }}
                                                  viewport={{ once: true, amount: 0.3 }}
                                                  display={{ base: "none", md: "flex" }}
                                                >
                                                  <Text fontWeight="medium" color="gray.700" fontSize={{ base: "xs", md: "md" }}>
                                                    {date}
                                                  </Text>
                                                  <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500">
                                                    {time}
                                                  </Text>
                                                </VStack>
                                                
                                                {/* Center - Timeline dot & line */}
                                                <Flex 
                                                  direction={["column", "row", "column"]} 
                                                  align="center" 
                                                  mr={[2, 2, 5]}
                                                  position="relative"
                                                  alignSelf={["flex-start", "flex-start", "stretch"]}
                                                  mt={[0, 0, 0]}
                                                  maxW={["28px", "auto", "auto"]}
                                                >
                                                  {/* Timeline dot */}
                                                                                                                    <Circle 
                                                    size={["20px", "24px", "36px"]} 
                                                    bg={`${statusColor}.100`}
                                                    borderWidth={{ base: 1, md: 2 }}
                                                    borderColor={isLatest ? `${statusColor}.500` : "transparent"}
                                                    zIndex={1}
                                                    boxShadow={["none", "none", "none"]}
                                                    as={motion.div}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    whileInView={{ 
                                                      scale: 1, 
                                                      opacity: 1,
                                                      transition: { 
                                                        duration: 0.4,
                                                        type: "spring",
                                                        stiffness: 300
                                                      }
                                                    }}
                                                    viewport={{ once: true, amount: 0.3 }}
                                                    whileHover={{ 
                                                      scale: [1, 1.2, 1.2],
                                                      boxShadow: ["none", "0 0 8px rgba(0,0,0,0.1)", "0 0 8px rgba(0,0,0,0.1)"],
                                                      transition: { duration: 0.2 }
                                                    }}
                                                  >
                                                    <motion.div
                                                      initial={{ rotate: -30, opacity: 0 }}
                                                      whileInView={{ 
                                                        rotate: 0, 
                                                        opacity: 1,
                                                        transition: { 
                                                          duration: 0.4
                                                        }
                                                      }}
                                                      viewport={{ once: true, amount: 0.3 }}
                                                    >
                                                      <Icon as={StatusIcon} color={`${statusColor}.500`} />
                                                    </motion.div>
                                                  </Circle>
                                                  
                                                  {/* Timeline connecting line */}
                                                  {index < trackingDataMap[selectedTracking].result.length - 1 && (
                                                    <Box 
                                                      w={["0px", "40px", "2px"]} 
                                                      h={["0px", "2px", "40px"]} 
                                                      bg="gray.200"
                                                      position={["static", "static", "absolute"]}
                                                      top={["auto", "auto", "24px"]}
                                                      left={["auto", "auto", "12px"]}
                                                      ml={[0, 2, 0]}
                                                      zIndex={0}
                                                      display={["none", "block", "block"]}
                                                      as={motion.div}
                                                      initial={{ 
                                                        height: ["0px", "2px", "0px"],
                                                        opacity: 0.3 
                                                      }}
                                                      whileInView={{ 
                                                        height: ["0px", "2px", "50px"],
                                                        opacity: 1,
                                                        transition: { 
                                                          duration: 0.5,
                                                          delay: 0.2
                                                        }
                                                      }}
                                                      viewport={{ once: true, amount: 0.3 }}
                                                    />
                                                  )}
                                                </Flex>
                                                
                                                {/* Right column - Status and location */}
                                                <Box flex="1" ml={{ base: 1, md: 0 }}>
                                                  <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ 
                                                      opacity: 1, 
                                                      x: 0,
                                                      transition: { 
                                                        duration: 0.4
                                                      }
                                                    }}
                                                    viewport={{ once: true, amount: 0.3 }}
                                                    whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                                  >
                                                                                                                        <Card 
                                                      bg={isLatest ? `${statusColor}.100` : "white"} 
                                                      p={{ base: 1, md: 4 }} 
                                                      borderRadius="md" 
                                                      border="1px" 
                                                      borderColor={isLatest ? `${statusColor}.200` : "gray.200"}
                                                      boxShadow={isLatest ? "sm" : "none"}
                                                    >
                                                      <Flex justify="space-between" align="center" width="100%">
                                                        <Text 
                                                          fontWeight="medium" 
                                                          color={isDelivered ? "teal.500" : "gray.700"}
                                                          fontSize={{ base: "xs", md: "md" }}
                                                        >
                                                          {statusTitle}
                                                        </Text>
                                                        
                                                        {/* Date/time for mobile view */}
                                                        <Text 
                                                          fontSize="2xs" 
                                                          color="gray.500" 
                                                          display={{ base: "block", md: "none" }}
                                                          textAlign="right"
                                                        >
                                                          {date}
                                                        </Text>
                                                      </Flex>
                                                      {location && (
                                                        <HStack mt={{ base: 0.5, md: 1 }} spacing={1}>
                                                          <Icon as={FiMapPin} color="gray.500" boxSize={{ base: 2, md: 3 }} />
                                                          <Text fontSize={{ base: "2xs", md: "sm" }} color="gray.500">
                                                            {location}
                                                          </Text>
                                                        </HStack>
                                                      )}
                                                      <Flex justify="space-between" align="flex-start" mt={{ base: 1, md: 2 }}>
                                                        <Text fontSize={{ base: "3xs", md: "xs" }} color="gray.400" whiteSpace="pre-wrap" flex="1">
                                                          {item.Message}
                                                        </Text>
                                                        
                                                        {/* Time for mobile view */}
                                                        <Text 
                                                          fontSize="2xs" 
                                                          color="gray.400"
                                                          display={{ base: "block", md: "none" }}
                                                          ml={2}
                                                          flexShrink={0}
                                                        >
                                                          {time}
                                                        </Text>
                                                      </Flex>
                                                    </Card>
                                                  </motion.div>
                                                </Box>
                                              </Flex>
                                            </motion.div>
                                          );
                                        })}
                                      </VStack>
                                    ) : (
                                      <Text>No tracking information available.</Text>
                                    )}
                                  </CardBody>
                                </Card>
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </Box>
                  </Flex>
                )}
              </Flex>
            </motion.div>
          </Container>
        </Box>
      )}
      
      
      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={onContactModalClose} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent mx={{ base: 2, md: 0 }} my={{ base: 4, md: "auto" }}>
          <ModalHeader className="header-font" fontSize={{ base: "md", md: "xl" }} py={{ base: 2, md: 4 }} px={{ base: 3, md: 6 }}>Contact Us</ModalHeader>
          <ModalCloseButton size={{ base: "sm", md: "md" }} />
          <ModalBody pb={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
            <VStack spacing={{ base: 2, md: 4 }} align="stretch">
              <Text mb={{ base: 1, md: 2 }} fontSize={{ base: "sm", md: "md" }}>
                Have questions or need assistance? Feel free to reach out to us.
              </Text>
              
              <HStack spacing={{ base: 2, md: 4 }} mb={{ base: 1, md: 2 }}>
                <Icon as={FiMail} boxSize={{ base: 4, md: 5 }} color="blue.500" />
                <Text fontSize={{ base: "sm", md: "md" }}>customerservice@lexship.com</Text>
              </HStack>
              
              <HStack spacing={{ base: 2, md: 4 }} mb={{ base: 1, md: 2 }}>
                <Icon as={FaWhatsapp} boxSize={{ base: 4, md: 5 }} color="green.500" />
                <Text fontSize={{ base: "sm", md: "md" }}>+91 8448444097</Text>
              </HStack>
              
              <HStack spacing={{ base: 2, md: 4 }} mt={{ base: 1, md: 2 }}>
                <Button
                  colorScheme="blue"
                  leftIcon={<FiMail />}
                  onClick={() => window.location.href = "mailto:customerservice@lexship.com"}
                  flex="1"
                  size={{ base: "sm", md: "md" }}
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Email Us
                </Button>
                
                <Button
                  colorScheme="green"
                  leftIcon={<FaWhatsapp />}
                  onClick={() => window.open("https://wa.me/918448444097", "_blank")}
                  flex="1"
                  size={{ base: "sm", md: "md" }}
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  WhatsApp
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Send Tracking Notifications Modal */}
<Modal isOpen={isTrackingNotificationModalOpen} onClose={onTrackingNotificationModalClose} size="lg">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader className="header-font">Send Tracking Notifications</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <VStack spacing={4} align="stretch">
        <Text mb={2}>
          Select which tracking events you'd like to receive notifications for. You can choose multiple events.
        </Text>
        
        {/* Checklist of tracking events */}
        <VStack align="start" spacing={2}>
          <Checkbox value="Out for Delivery" onChange={handleCheckboxChange}>Delivered</Checkbox>
          <Checkbox value="Out for Delivering" onChange={handleCheckboxChange}>Out for Delivery</Checkbox>
          <Checkbox value="Cleared Customs" onChange={handleCheckboxChange}>Cleared Customs</Checkbox>
          <Checkbox value="Cleared Customs" onChange={handleCheckboxChange}>Ready for Pickup</Checkbox>
        </VStack>

        <HStack spacing={4} mt={4}>
          <Button
            colorScheme="green"
            leftIcon={<FaWhatsapp />}
            onClick={handleSendNotification}
            flex="1"
          >
            Send WhatsApp Notification
          </Button>
        </HStack>
      </VStack>
    </ModalBody>
  </ModalContent>
</Modal>


      {/* Bulk Add Modal */}
      <Modal isOpen={isBulkModalOpen} onClose={onBulkModalClose} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent mx={{ base: 2, md: 0 }} my={{ base: 4, md: "auto" }}>
          <ModalHeader className="header-font" fontSize={{ base: "md", md: "lg" }} py={{ base: 2, md: 4 }} px={{ base: 3, md: 6 }}>
            Bulk Add Tracking Numbers
          </ModalHeader>
          <ModalCloseButton size={{ base: "sm", md: "md" }} />
          <ModalBody pb={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
            <Text mb={{ base: 2, md: 4 }} fontSize={{ base: "sm", md: "md" }}>
              Enter multiple tracking numbers, separated by comma, space, or new line:
            </Text>
            <Textarea
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              rows={{ base: 4, md: 6 }}
              fontSize={{ base: "sm", md: "md" }}
              size={{ base: "sm", md: "md" }}
              placeholder="Enter tracking numbers here..."
            />
            
            <Button
              mt={{ base: 3, md: 6 }}
              colorScheme="blue"
              onClick={handleBulkAdd}
              width="full"
              isDisabled={!bulkInput.trim()}
              size={{ base: "sm", md: "md" }}
            >
              Add All Tracking Numbers
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Remove All Confirmation Modal */}
      <Modal isOpen={isRemoveAllModalOpen} onClose={onRemoveAllModalClose} isCentered motionPreset="slideInBottom" size={{ base: "xs", md: "md" }}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(3px)" />
        <ModalContent mx={{ base: 2, md: 0 }} my={{ base: 4, md: "auto" }}>
          <ModalHeader fontSize={{ base: "md", md: "xl" }} fontWeight="bold" color="red.500" className="header-font" py={{ base: 2, md: 4 }} px={{ base: 3, md: 6 }}>
            <Flex align="center">
              <Icon as={FiAlertTriangle} mr={{ base: 1, md: 2 }} boxSize={{ base: 4, md: 5 }} />
              <Text fontSize={{ base: "sm", md: "xl" }}>Remove All Trackings</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton size={{ base: "sm", md: "md" }} />
          <ModalBody pb={{ base: 3, md: 6 }} px={{ base: 3, md: 6 }}>
            <VStack spacing={{ base: 2, md: 4 }} align="stretch">
              <Text fontSize={{ base: "sm", md: "md" }}>
                Are you sure you want to remove all tracking numbers?
              </Text>
              
              <Box bg="gray.50" p={{ base: 2, md: 3 }} borderRadius="md" borderLeft="3px solid" borderColor="blue.400">
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                  Remove <b>{trackingNumbers.length}</b> shipments for now.
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter py={{ base: 2, md: 4 }} px={{ base: 3, md: 6 }}>
            <Button colorScheme="gray" mr={{ base: 2, md: 3 }} onClick={onRemoveAllModalClose} size={{ base: "sm", md: "md" }}>
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              leftIcon={<FiX />}
              onClick={() => {
                setTrackingNumbers([]);
                setTrackingDataMap({});
                setErrorMap({});
                setSelectedTracking(null);
                setShowTrackingSection(false);
                setActiveSection("home");
                onRemoveAllModalClose();
              }}
              size={{ base: "sm", md: "md" }}
            >
              Yes, Remove All
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Stat Card component for the stats bar
const StatCard = ({ icon, title, value, colorScheme = "gray" }) => {
  return (
    <Card 
      p={{ base: 2, md: 4 }} 
      bg={`${colorScheme}.50`}
      borderRadius="md" 
      border="1px" 
      borderColor={`${colorScheme}.200`}
      as={motion.div}
      whileHover={{ y: -5, boxShadow: "lg" }}
      transition={{ duration: 0.2 }}
    >
      <Flex align="center">
        <Circle size={{ base: "28px", md: "40px" }} bg={`${colorScheme}.100`} color={`${colorScheme}.500`} mr={{ base: 2, md: 3 }}>
          <Icon as={icon} boxSize={{ base: 3, md: 5 }} />
        </Circle>
        <Box>
          <Text fontSize={{ base: "2xs", md: "sm" }} color={`${colorScheme}.700`} fontWeight="medium" className="subtitle-font">
            {title}
          </Text>
          <Text fontSize={{ base: "md", md: "2xl" }} fontWeight="bold" color={`${colorScheme}.700`} className="header-font">
            {value}
          </Text>
        </Box>
        
      </Flex>
    </Card>

    
  );
};

// BulkTrackingResults component - Add this after the StatCard component at the end of the file
const BulkTrackingResults = ({ 
  trackingDataMap, 
  trackingNumbers, 
  getStatusColor, 
  getShipmentStatus, 
  formatDate, 
  calculateDeliveryDays, 
  handleTrack, 
  getCountryFlag,
  formatCityName,
  setSelectedTracking,
  setActiveSection,
  setShowTrackingSection,
  setTrackingNumbers
}) => {
  return (

    // Bulk Tracking Section

    <Card 
      boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      bg="white" 
      mb={6} 
      color="gray.700"
      overflow="hidden"
      borderRadius="xl"
      maxW={{ base: "100%", md: "container.xl" }}
      mx="auto"
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box bg="blue.600" p={{ base: 2, md: 4 }} color="white" bgGradient="linear(135deg, blue.600 0%, blue.700 100%)"
       _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgGradient: "linear(45deg, transparent 0%, rgba(255,255,255,0.1) 100%)",
        pointerEvents: "none"
      }}
>
        <Heading size={{ base: "sm", md: "md" }} className="header-font">Tracked Packages ({trackingNumbers.length})</Heading>
        <Text fontSize={{ base: "xs", md: "sm" }} mt={1}>Showing all tracked shipments</Text>
      </Box>
      
      <VStack 
        spacing={0} 
        align="stretch" 
        divider={<Divider />}
        maxH={{ base: "400px", md: "500px" }}
        overflowY="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '4px',
            background: 'transparent',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(49, 130, 206, 0.6)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(49, 130, 206, 0.8)',
            }
          },
          'scrollbarWidth': 'thin',
          'scrollbarColor': 'rgba(49, 130, 206, 0.6) transparent',
          'msOverflowStyle': 'auto',
        }}
      >
        {trackingNumbers.map((number) => {
          const data = trackingDataMap[number];
          const hasData = data && data.result && data.result.length > 0;
          const latestEvent = hasData ? data.result[data.result.length - 1] : null;
          const statusColor = hasData ? getStatusColor(latestEvent.Message) : "gray";
          
          // Calculate days since shipment if available
          let daysSinceShipment = null;
          if (hasData && data.result.length >= 2) {
            const deliveryInfo = calculateDeliveryDays(data.result);
            daysSinceShipment = deliveryInfo.businessDays;
          }
          
          return (
            <Box key={number} position="relative" borderBottom="1px solid" borderColor="gray.100">
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton 
                    py={{ base: 2, md: 4 }} 
                    px={{ base: 3, md: 5 }}
                    _hover={{ bg: "gray.50" }}
                    transition="all 0.2s"
                  >
                      {/* Desktop View - Grid Layout */}
                      <Box display={{ base: "none", md: "block" }} width="100%">
                        <Grid 
                          templateColumns="1fr 1.5fr 2fr 1fr" 
                          gap={4} 
                          width="100%"
                          alignItems="center"
                        >
                          {/* Tracking Number */}
                          <VStack align="start" spacing={1}>
                            <HStack>
                              <Text fontWeight="bold" color="gray.700" fontSize="md">
                                {number}
                              </Text>
                              {daysSinceShipment && (
                                <Badge ml={2}  borderRadius="full" px={2} color="gray.700">
                                  {daysSinceShipment} Days
                                </Badge>
                              )}
                            </HStack>
                            
                          </VStack>
                          
                          {/* From/To */}
                          {hasData && data.originInfo && data.destinationInfo ? (
                            <Flex direction="column" gap={2}>
                              <HStack>
                                <Text fontSize="xs" color="gray.500" width="40px">From:</Text>
                                <HStack>
                                  {data.originInfo.country && (
                                    <Image 
                                      src={getCountryFlag(data.originInfo.country)} 
                                      alt={data.originInfo.country} 
                                      height="16px" 
                                      width="24px"
                                      objectFit="cover"
                                      borderRadius="sm"
                                      mr={1}
                                    />
                                  )}
                                  <Text fontSize="sm" fontWeight="medium">
                                    {formatCityName(data.originInfo.city)}, {data.originInfo.country}
                                  </Text>
                                </HStack>
                              </HStack>
                              
                              <HStack>
                                <Text fontSize="xs" color="gray.500" width="40px">To:</Text>
                                <HStack>
                                  {data.destinationInfo.country && (
                                    <Image 
                                      src={getCountryFlag(data.destinationInfo.country)} 
                                      alt={data.destinationInfo.country} 
                                      height="16px" 
                                      width="24px"
                                      objectFit="cover"
                                      borderRadius="sm"
                                      mr={1}
                                    />
                                  )}
                                  <Text fontSize="sm" fontWeight="medium">
                                    {formatCityName(data.destinationInfo.city)}, {data.destinationInfo.country}
                                  </Text>
                                </HStack>
                              </HStack>
                            </Flex>
                          ) : (
                            <Text fontSize="sm" color="gray.500">Route information unavailable</Text>
                          )}
                          
                          {/* Status */}
                          <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                            {hasData ? (
                              <>
                                {latestEvent.Message}
                                <Text fontSize="xs" color="gray.500" mt={1}>
                                  {formatDate(latestEvent.Timestamp).date}
                                </Text>
                              </>
                            ) : (
                              "No tracking data available"
                            )}
                          </Text>
                          
                          {/* View Details Button */}
                          <Button
                            size="sm"
                            colorScheme="blue"
                            color="blue.500"
                            variant="outline"
                            rightIcon={<FiChevronRight />}
                            onClick={(e) => {
                              e.stopPropagation();
                              
                              // Only show this specific tracking number
                              setTrackingNumbers([number]);
                              
                              // Set this as the selected tracking
                              setSelectedTracking(number);
                              
                              // Change view to tracking section and scroll there
                              setActiveSection("tracking");
                              setShowTrackingSection(true);
                              
                              // Scroll to tracking section
                              setTimeout(() => {
                                const trackingSection = document.getElementById("tracking-section");
                                if (trackingSection) {
                                  trackingSection.scrollIntoView({ behavior: "smooth" });
                                }
                              }, 100);
                            }}
                            display={{ base: "none", md: "flex" }}
                            ml="auto"
                          >
                            View Details
                          </Button>
                        </Grid>
                      </Box>
                      
                      {/* Mobile View - Custom Layout */}
                      <Box display={{ base: "block", md: "none" }} width="100%">
                        <VStack spacing={2} align="stretch">
                          {/* First Row - AWB number and Status */}
                          <Flex justify="space-between" align="center">
                            <HStack>
                              <Text fontWeight="bold" color="gray.700" fontSize="xs" noOfLines={1} maxWidth="150px">
                                {number}
                              </Text>
                              {daysSinceShipment && (
                                <Badge color="gray.700" fontSize="7pt" borderRadius="full">
                                  {daysSinceShipment} days
                                </Badge>
                              )}
                            </HStack>
                            {/* Full status message */}
                            <Text ml="auto" fontSize="10.5px"  color="gray.700" fontWeight="bold" noOfLines={1} isTruncated maxW="420px" textAlign="center">
                                {hasData ? latestEvent.Message : ''}
                              </Text>
                          </Flex>
                          
                          {/* Second Row - From/To on one line */}
                          {hasData && data.originInfo && data.destinationInfo && (
                            <Flex align="center" fontSize="xs">
                              <HStack spacing={1}>
                                {data.originInfo.country && (
                                  <Image 
                                    src={getCountryFlag(data.originInfo.country)} 
                                    alt={data.originInfo.country} 
                                    height="14px" 
                                    width="20px"
                                    objectFit="cover"
                                    borderRadius="sm"
                                  />
                                )}
                                <Text fontWeight="medium" mr={1} fontSize="xs">
                                  {data.originInfo.country}
                                </Text>
                              </HStack>
                              
                              <Icon as={FiArrowRight} mx={1} color="gray.400" boxSize={3} />
                              
                              <HStack spacing={1}>
                                {data.destinationInfo.country && (
                                  <Image 
                                    src={getCountryFlag(data.destinationInfo.country)} 
                                    alt={data.destinationInfo.country} 
                                    height="14px" 
                                    width="20px"
                                    objectFit="cover"
                                    borderRadius="sm"
                                  />
                                )}
                                <Text fontWeight="medium" fontSize="xs">
                                  {data.destinationInfo.country}
                                </Text>
                              </HStack>
                              
                              
                            </Flex>
                          )}
                        </VStack>
                      </Box>
                      
                      <AccordionIcon ml={2} color="blue.500" />
                    </AccordionButton>
                  
                  <AccordionPanel pb={{ base: 2, md: 4 }} pt={{ base: 1, md: 3 }} px={{ base: 2, md: 4 }} bg="gray.50">
                    {hasData ? (
                      <VStack align="start" spacing={{ base: 1, md: 3 }} p={{ base: 1, md: 2 }}>
                        <Heading size={{ base: "xs", md: "sm" }} className="header-font">Recent Tracking Updates</Heading>
                        
                        <VStack spacing={{ base: 1, md: 3 }} align="start" width="100%">
                          {data.result.slice().reverse().map((event, idx) => (
                            <Box 
                              key={idx} 
                              p={{ base: 2, md: 3 }}
                              borderLeft="2px solid" 
                              borderColor={`${getStatusColor(event.Message)}.400`} 
                              pl={{ base: 2, md: 4 }}
                              width="100%"
                              bg="white"
                              borderRadius="md"
                              shadow="sm"
                            >
                              <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold">{event.Message}</Text>
                              <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
                                {formatDate(event.Timestamp).date}, {formatDate(event.Timestamp).time}
                              </Text>
                            </Box>
                          ))}
                        </VStack>
                        
                        {/* Mobile view button */}
                        <Button
                          size="sm"
                          colorScheme="blue"
                          rightIcon={<FiChevronRight />}
                          onClick={(e) => {
                            e.stopPropagation();
                            
                            // Only show this specific tracking number
                            setTrackingNumbers([number]);
                            
                            // Set this as the selected tracking
                            setSelectedTracking(number);
                            
                            // Change view to tracking section and scroll there
                            setActiveSection("tracking");
                            setShowTrackingSection(true);
                            
                            // Scroll to tracking section
                            setTimeout(() => {
                              const trackingSection = document.getElementById("tracking-section");
                              if (trackingSection) {
                                trackingSection.scrollIntoView({ behavior: "smooth" });
                              }
                            }, 100);
                          }}
                          width="full"
                          display={{ base: "flex", md: "none" }}
                          mt={2}
                        >
                          View Full Details
                        </Button>
                      </VStack>
                    ) : (
                      <Flex justify="center" align="center" direction="column" py={4}>
                        <Icon as={FiAlertCircle} color="orange.500" boxSize={6} mb={2} />
                        <Text>No tracking data available for this shipment</Text>
                        <Button
                          mt={4}
                          size="sm"
                          leftIcon={<FiRefreshCw />}
                          colorScheme="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTrack(number);
                          }}
                        >
                          Refresh Tracking
                        </Button>
                      </Flex>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          );
        })}
      </VStack>
      
             <Flex justify="space-between" p={4} bg="gray.50" borderTop="1px" borderColor="gray.200">
         <Button 
           leftIcon={<FiRefreshCw />} 
           colorScheme="blue" 
           variant="outline"
           size="sm"
           onClick={(e) => {
             e.stopPropagation();
             handleTrack(); // This will refresh the current tracking
           }}
         >
           Refresh All
         </Button>
        
        <Button
          size="sm"
          onClick={() => {
            // Scroll to tracking section
            const trackingSection = document.getElementById("tracking-section");
            if (trackingSection) {
              trackingSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Manage Trackings
        </Button>
        <HStack spacing={3}>
            
            <Button
            leftIcon={<FiPackage />}
              variant="ghost"
              colorScheme="blue"
              color="gray.700"
              onClick={() => {
                setActiveSection("tracking");
                setShowTrackingSection(true);
                
                // Scroll to tracking section
                setTimeout(() => {
                  const trackingSection = document.getElementById("tracking-section");
                  if (trackingSection) {
                    trackingSection.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
              
              fontWeight="300"
              _hover={{
                bg: "blue.100"
              }}
              borderRadius="lg"
            >
              Manage All Trackings
            </Button>
          </HStack>
      </Flex>
    </Card>
    
  );
};

// Add a function to handle the "View Details" button click
const handleViewDetails = (trackingNumber) => {
  // Ensure the tracking number is in the list (add it if not)
  if (!trackingNumbers.includes(trackingNumber)) {
    setTrackingNumbers(prev => [...prev, trackingNumber]);
  }
  
  // Set this tracking number as selected
  setSelectedTracking(trackingNumber);
  
  // Show the tracking section and set active section
  setActiveSection("tracking");
  setShowTrackingSection(true);
  
  // Load tracking data if needed
  if (!trackingDataMap[trackingNumber] || !trackingDataMap[trackingNumber].result) {
    handleTrack(trackingNumber);
  }
  
  // Scroll to tracking section
  setTimeout(() => {
    const trackingSection = document.getElementById("tracking-section");
    if (trackingSection) {
      trackingSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
};

// ... existing code ...

// This comment reminds us where the JSX will be added
// We'll move the actual JSX into the return statement inside the component

export default Tracking;