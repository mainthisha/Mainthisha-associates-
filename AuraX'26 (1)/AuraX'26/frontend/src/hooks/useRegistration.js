import { useState } from "react";
import { registrationApi } from "../services/registrationApi";

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submitIndividual = async (eventId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registrationApi.registerIndividual(eventId, formData);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitTeam = async (eventId, formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registrationApi.registerTeam(eventId, formData);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return { loading, error, result, submitIndividual, submitTeam, reset };
}