from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .forms import CustomUserCreationForm

# Create your views here.

@login_required
def dashboard(request):
    return render(request, 'users/dashboard.html')

def custom_login(request):
    if request.user.is_authenticated:
        return redirect(reverse(dashboard))
    else:
        return login(request)

def register(request):
    if request.user.is_authenticated:
        return redirect(reverse(dashboard))
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(reverse(dashboard))
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})