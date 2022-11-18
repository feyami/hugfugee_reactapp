import useTitle from "hooks/useTitle";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProjectSlice, useContactSlice, useCustomerSlice } from "redux/features";
import { useDispatch, useSelector } from "react-redux";
export const shortImports = () => {
    return {
        useTitle,
        useState,
        useEffect,
        useNavigate,
        useProjectSlice,
        useContactSlice,
        useCustomerSlice,
    };
};
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

